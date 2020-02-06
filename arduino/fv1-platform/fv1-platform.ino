#include <Wire.h>
#include "SPI.h"
#include "Adafruit_GFX.h"
#include "Adafruit_ILI9341.h"
#include "Optima9pt7b.h"
#include "Neb14pt7b.h"

#define PIN_TFT_DC 9
#define PIN_TFT_CS 10

#define PIN_BYPASS 5

#define PIN_BANK 6

#define DEBOUNCE_TIME 100

#define PIN_ROT1 2 // 1p8t rotary switch
#define PIN_ROT2 3
#define PIN_ROT3 4

/* We're using a 24LC32A */
#define EEPROM_ADDRESS B1010000 // 1010 + 3 bits for pins 1,2,3
#define EEPROM_BUFFER_SIZE 22 // It has a 32 byte page write buffer, but make this as small as possible 
#define EEPROM_PAGE_SIZE 32
#define EEPROM_CLOCK_SPEED 400000

#define TFT_WIDTH 240
#define TFT_HEIGHT 320
#define BAR_Y_START 5
#define BAR_SMOOTHING 5 // If pot changes by this much or less, don't change the bar width. Prevents stuttering.
#define BAR_WIDTH 234 // not including margins
#define BAR_HEIGHT 28 // not including margins
#define BAR_MARGIN 3
#define BAR_SECTION_TOTAL_HEIGHT 65 // bar + margins*2 + text_height + spacing. This effectively controls bottom margin of section
#define BAR_TEXT_BASELINE_OFFSET 20 // this effectively controls margin below text
#define BAR_TEXT_MAX_HEIGHT 30 // this was found through trial and error

#define PROGRAM_LABEL_OFFSET 55 // trial and error, how far down to move the label text
#define PROGRAM_BG_BUFFER 20  // Space between bottom bar and top of program name section


#define POTS_REVERSED // Comment this out if your p1-p3 aren't reversed
#if defined(POTS_REVERSED)
  const int pot_pins[] = {A2, A1, A0}; // p3, p2, p1
  #define POT_LABEL_I(i) 2-i
#else
  const int pot_pins[] = {A0, A1, A2}; // p1, p2, p3
  #define POT_LABEL_I(i) i
#endif


// https://ee-programming-notepad.blogspot.com/2016/10/16-bit-color-generator-picker.html
const int bar_colors[3][2] = {
  {0xEC2E, 0xE73D}, //0x2127
  {0x324B, 0xE73D}, // 0xE104
  {0x65B5, 0xE73D},   // 0xFDC3
};
#define PROGRAM_BG_COLOR 0x2A2C
#define PROGRAM_LABEL_COLOR 0xFFFF
#define LABEL_COLOR 0xFFFF
#define BAR_OUTLINE_COLOR 0xFFFF
#define BG_COLOR 0x0000


Adafruit_ILI9341 tft = Adafruit_ILI9341(PIN_TFT_CS, PIN_TFT_DC);


/* The eeprom stores labels, 1 per page. They're ordered as sets of 4 strings: the program name, then 3 control labels.
   The first 8 sets are for the FV-1's internal program, the next 8 are the custom ones on the other "sister" EEPROM.
   We're going to read the needed labels on-the-fly when the program or bank changes. Initially it was loaded up once
   at boot, but it requires too much memory.
*/
char labels[4][EEPROM_BUFFER_SIZE] = {
  // 0: Program label
  "-",
  // 1-3: control labels
  "N/A",
  "N/A",
  "N/A"
};

boolean bypassed = false;
byte selected_bank = B0; // 0 is internal, 1 is ROM
byte selected_program = B0; // 0 to 7

byte last_program = B11111111;
byte last_bank = B11111111;
unsigned long last_program_debounce_time = 0;

void drawBars(boolean force = false);

void setup() {
  //Serial.begin(9600);

  Wire.begin();
  Wire.setClock(EEPROM_CLOCK_SPEED);

  for (int i = 0; i < 3; i++) {
    pinMode(pot_pins[i], INPUT);
  }

  pinMode(PIN_BYPASS, INPUT_PULLUP);
  bypassed = digitalRead(PIN_BYPASS) == HIGH;

  pinMode(PIN_BANK, INPUT_PULLUP);
  pinMode(PIN_ROT1, INPUT);
  pinMode(PIN_ROT2, INPUT);
  pinMode(PIN_ROT3, INPUT);

  tft.begin();
  tft.setRotation(0);
  tft.setTextWrap(false);


  byte bank = readBank();
  byte program = readProgram();  
  last_program = program;
  last_bank = bank;
  selectProgram(bank, program, false);

  setupScreen();
}

void loop() {
  checkBypassed();
  if (! bypassed) {
    checkProgram();
    drawBars();
  }
}

byte readBank() {
  return (byte)(digitalRead(PIN_BANK) == LOW ? B0 : B1);
}
byte readProgram() {
  // Program is 0-7 depending on the combination of these 3 inputs.
  byte rot1 = digitalRead(PIN_ROT1) == LOW ? B0 : B001;
  byte rot2 = digitalRead(PIN_ROT2) == LOW ? B0 : B010;
  byte rot3 = digitalRead(PIN_ROT3) == LOW ? B0 : B100;

  return (byte)(rot1 | rot2 | rot3);
}

/* Call every loop. Changes bypassed state. */
void checkBypassed() {
  // TBD: Does this need to be debounced?
  boolean nowBypassed = digitalRead(PIN_BYPASS) == HIGH;
  if (nowBypassed != bypassed) {
    bypassed = nowBypassed;
    setupScreen();
  }
}


/* Call every loop */
void checkProgram() {
  byte bank = readBank();
  byte program = readProgram();

  if (bank != last_bank || program != last_program) {
    last_program_debounce_time = millis();
  }

  if ((selected_bank != bank || selected_program != program) && (millis() - last_program_debounce_time) > DEBOUNCE_TIME) {
    selectProgram(bank, program, true);
  }

  last_program = program;
  last_bank = bank;
}
void selectProgram(byte bank, byte program, boolean draw) {
  selected_bank = bank;
  selected_program = program;

  _setLabelsForSelectedProgram();
  if (draw) {
    drawLabels();
  }
}

/* Call this to redraw everything. Very slow. NOT in a loop */
void setupScreen() {
  tft.fillScreen(BG_COLOR);
  if (bypassed) {
    _drawBypassed();
  } else {
    _drawBarOutlines();
    drawLabels();
    drawBars(true);
  }
}
void _drawBypassed() {
  tft.fillScreen(BG_COLOR);
  tft.setFont(&Neb14pt7b);
  tft.setCursor(centerXForText("BYPASSED"), 120);
  tft.println("BYPASSED");
  // TODO: Do a nice graphic or animation?
}

/* Call this when labels change. */
void drawLabels() {
  tft.setFont(&Optima9pt7b);
  tft.setTextColor(LABEL_COLOR, BG_COLOR);
  for (int i = 0; i < 3; i++) {
    // first blank out the old text
    int y = BAR_Y_START + i * BAR_SECTION_TOTAL_HEIGHT;
    tft.fillRect(0, y, TFT_WIDTH, BAR_TEXT_MAX_HEIGHT, BG_COLOR);

    tft.setCursor(2, y + BAR_TEXT_BASELINE_OFFSET);
    tft.print(labels[POT_LABEL_I(i + 1)]);
  }

  // Fill in the bottom of the screen
  int y = BAR_Y_START + 3 * BAR_SECTION_TOTAL_HEIGHT + PROGRAM_BG_BUFFER;
  tft.fillRect(0, y, TFT_WIDTH, TFT_HEIGHT - y, PROGRAM_BG_COLOR);
  
  tft.setFont(&Neb14pt7b);
  tft.setTextColor(PROGRAM_LABEL_COLOR, PROGRAM_BG_COLOR);

  // Write the program name, centered.
  tft.setTextWrap(true);

  int16_t  x_ignored, y_ignored;
  uint16_t w, h;
  tft.getTextBounds(labels[0], 0, y, &x_ignored, &y_ignored, &w, &h);

  int x = w < TFT_WIDTH ? (TFT_WIDTH - w) / 2 : 0;
  tft.setCursor(centerXForText(labels[0]), y + PROGRAM_LABEL_OFFSET);
  tft.print(labels[0]);
  tft.setTextWrap(false);
}

void _drawBarOutlines() {
  for (int i = 0; i < 3; i++) {
    tft.drawRect(0, BAR_Y_START + i * BAR_SECTION_TOTAL_HEIGHT + BAR_TEXT_MAX_HEIGHT, BAR_WIDTH + 2 * BAR_MARGIN, BAR_HEIGHT + 2 * BAR_MARGIN, BAR_OUTLINE_COLOR);
  }
}

/* Fills in all the bars. Call frequently. */
int last_pot_val[] = {0, 0, 0, 0, 0};
void drawBars(boolean force = false) {
  for (int i = 0; i < 3; i++) {
    int pot_val = analogRead(pot_pins[i]);

    if (!force && abs(pot_val - last_pot_val[i]) <= BAR_SMOOTHING) {
      /* Don't redraw if it hasn't moved much.
         This prevents the bar from flickering, as well as
         stuttering back and forth.
      */
      continue;
    } else {
      last_pot_val[i] = pot_val;
    }
    
    // 0 - 312 on usb, 0-...736 on 9V wall wart.
    float percent = ((float)pot_val / 740);
    if (percent > 1) {
      percent = 1;
    }

    int width = percent * BAR_WIDTH;
    int y = BAR_Y_START + i * BAR_SECTION_TOTAL_HEIGHT + BAR_TEXT_MAX_HEIGHT + BAR_MARGIN;
    tft.fillRect(BAR_MARGIN, y, width, BAR_HEIGHT, bar_colors[i][0]);
    tft.fillRect(BAR_MARGIN + width, y, BAR_WIDTH - width, BAR_HEIGHT, bar_colors[i][1]);
  }
}

/* Get X position for text if we want to center it. */
int centerXForText(char *text) {
  int16_t  x, y;
  uint16_t w, h;
  // getTextBounds() seems to have a bug. Some text ("Modulated Reverb") results in a width that's too large.
  tft.getTextBounds(text, 50, 1, &x, &y, &w, &h);
  return (w < TFT_WIDTH ? ((TFT_WIDTH - w) / 2) : 0);
}

/* This pulls labels off of EEPROM based on selected_bank and selected_program. */
void _setLabelsForSelectedProgram() {
  // 32 == 8 programs per bank * 4 strings per program.
  // 4 == 4 strings per program
  /* (starting position for bank) + (starting position for program) */
  unsigned int base_address = (EEPROM_PAGE_SIZE * 32 * selected_bank) + (EEPROM_PAGE_SIZE * 4 * selected_program);
  for (int i = 0; i < 4; i++) {
    unsigned int address = base_address + EEPROM_PAGE_SIZE * i;
    Wire.beginTransmission(EEPROM_ADDRESS);
    Wire.write((int)(address >> 8)); // MSB
    Wire.write((int)(address & 0xFF)); // LSB
    Wire.endTransmission();

    Wire.requestFrom(EEPROM_ADDRESS, EEPROM_BUFFER_SIZE);
    byte data = '\0';
    for (int j = 0; j < EEPROM_BUFFER_SIZE; j++) {
      if (Wire.available()) {
        data = Wire.read();
        labels[i][j] = data;
        if (data == '\0') {
          break;
        }
      }
    }
  }
}
