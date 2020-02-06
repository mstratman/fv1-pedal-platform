# FV-1 Pedal Platform

## Overview

This project contains the files for a guitar effects pedal utilizing a TFT screen, Atmega display driver, FV-1 DSP module, and EEPROMs to hold the FV-1 programs and labels.

The schematics and PCBs included reflect the v1 prototype, which was pieced together utilizing an [Arachnid board from Pedalpcb](https://www.pedalpcb.com/product/arachnid/), and 4 etched PCBs for additional functionality.  Future builds will be simplified to use a single, manufactured board.

## DSP code to run on the pedal

**[https://mstratman.github.io/fv1-programs/](https://mstratman.github.io/fv1-programs/)**

## PCBs

* [Arachnid board from Pedalpcb](https://www.pedalpcb.com/product/arachnid/) is very similar to the "typical application" circuit from the FV-1 datasheet
* 5V voltage regulator board: This is not included in the `pcbs` directory of this project. It's simply a small piece of veroboard with the circuit shown in the [pedal schematic](schematics/pedal.png).
* TFT board
* Arduino and EEPROM board
* Rotary switch board

## Arduino or Atmega328p

This was originally built using an Atmega328p rather than full nano board, but the, and you could just as easily use that. I recommend setting it up with a 16MHz crystal to maximize display refresh rate.

I switched to an Arduino Nano board because it was quicker and easier to test and debug since it has a built-in USB controller, and I found a pack of clone boards for a few dollars. Now that the code is stable, this isn't nearly as important, so an Atmega328p would be fine.

## Rotary switch

We're reading the rotary switch from both the FV-1 and the Atmega. We really only need one set of diodes to do this, but wiring into the FV-1's Arachnid board is more trouble than it's worth, so we just have a duplicate set of them for the Atmega to use.

When v2 is built onto a single board, we will eliminate the duplication.

## EEPROM

We have two EEPROM's.  One for the FV-1 with the DSP code, and one for the Atmega with the names of the programs and the labels.  We could just hard-code the program names and control labels into the Atmega, but this allows us to swap out programs more easily without needing to reprogram it.

For ease of programming, and because we control the data going onto it, we're simply going to store each string on one of the 32byte pages. This allows us to ignore page boundaries, and simply read and write one page at a time.

Note: Running the EEPROM off 3.3V did not work with my Arduino board.  It works fine with 5V though.

## Bank switching

...

## Fonts

The `.h` files for the fonts are created using [fontconvert](https://github.com/adafruit/Adafruit-GFX-Library/tree/master/fontconvert) from the [Adafruit GFX library](https://github.com/adafruit/Adafruit-GFX-Library).

## What's next (v2)

If I build a v2 using a fabricated board, I'll simplify it to a single set of switching diodes.

Second, I'll let it switch between two pairs of eeproms for 16 instead of 8 custom programs.

Possibly: I'll use the arduino to control program selection and have it skip over the built-in FV-1 programs that aren't very useful for guitar
