<template>
  <div id="app">
    <h2>Choose 1-8 programs</h2>

    <div class="setup">
      <label><input v-model="showFile" type="checkbox">  Show filename</label>

      <div>
        <label for="filter">Filter: <input type="text" id="filter" v-model="filter"/></label>
      </div>

      <div>
        <label for="code">Code: <input type="text" id="code" v-model="code"/></label>
        <input type="button" v-on:click="setSelectedFromCode" value="Update Selected">
        <input type="button" v-on:click="first8" value="(first 8)">
        <input type="button" v-on:click="last8" value="(last 8)">
      </div>
    </div>


    <div v-for="p in filteredPrograms" :key="p.idx">
      <label :for="`check${p.idx}`">
        <input type="checkbox" :id="`check${p.idx}`" :value="p.idx" v-model="selected"/>
        {{p.name}}
        <span v-if="showFile && p['download'] && p['download']['spn']" style="margin-left: 2rem;">
          <code>{{p['download']['spn']['file']}}</code>
        </span>
      </label>
    </div>

    <h2>Copy arduino code</h2>
    <div class="warning" v-show="selected.length>8">
      <h3>Too many programs</h3>
      You have <strong>{{selected.length}}</strong> chosen, but cannot have more than 8
    </div>

    <div class="warning" v-show="warnNoControls.length > 0">
      <h3>Missing controls</h3>
      <small>Add them to <a target="_blank" href="https://github.com/mstratman/fv1-programs/blob/master/programs.js">programs.js and submit a pull request</a> (or <a href="mailto:mark@mas-effects.com">email your change to Mark</a>)</small>
      <ul>
        <li v-for="p in warnNoControls" :key="p.idx">{{p.name}}</li>
      </ul>
    </div>

    <textarea rows="10" style="width:100%;" v-model="arduinoCode"></textarea>

    <h2>spn files (for reference)</h2>
    <ul>
      <li v-for="(idx, j) in selected" :key="idx">
        <em>{{j}}:</em>
        <template v-if="programs[idx]['download']['spn'] && programs[idx]['download']['spn']['file']">
          {{programs[idx]['download']['spn']['file']}}
        </template>
        <div v-else class="warning">
          {{programs[idx].name}} has
          no SPN file
        </div>
      </li>
    </ul>



  </div>
</template>

<script>
import programs from '../programs.js'
import programsWithIds from '../programs-with-ids.js'

function addIndex(programs) {
  let i = 0
  return programs.map(p => {
    return {idx: i++, ...p }
  })
}

export default {
  name: 'App',
  data: function() {
    return {
      filter: '',
      programs: addIndex(programs),
      code: '',
      selected: [],
      showFile: false,
    }
  },

  mounted: function() {
    // this is an inefficient implementation. But that's okay for an internal tool, especially in 'mounted'
    for (let i = 0; i < programsWithIds.length; i++) {
      let fn = programsWithIds[i].file
      let id = programsWithIds[i].id
      let p = this.programs.find(p => {
        return p['download'] && p['download']['spn'] && p['download']['spn']['file'] && p['download']['spn']['file'] == fn
      })
      if (p) {
        p.id = id
      } else {
        console.log("CANNOT FIND id= ", id)
      }
    }

  },

  methods: {
    setSelectedFromCode: function() {
      let codes = this.code.match(/.{1,2}/g)
      this.selected = []
      for (let i = 0; i < codes.length; i++) {
        let p = this.programs.find(p => {
          return p['id'] == codes[i]
        })
        this.selected.push(p.idx)
      }
    },
    first8: function() {
      this.code = this.code.substr(0,16)
      this.setSelectedFromCode()
    },
    last8: function() {
      this.code = this.code.substr(-16,16)
      this.setSelectedFromCode()
    },
    setCodeFromSelected: function() {
      let code = ''
      for (let i = 0; i < this.selected.length; i++) {
        let p = this.programs[this.selected[i]]
        let id = p.id || '??'
        code += id
      }
      this.code = code
    }
  },
  watch: {
    selected: function() {
      this.setCodeFromSelected()
    },
  },
  computed: {
    filteredPrograms: function() {
      if (this.filter == "") {
        return this.programs
      } else {
        let f = this.filter
        let match = (str) => { return str.toLowerCase().indexOf(f.toLowerCase()) !== -1 }
        return this.programs.filter(p => {
          return match(p.name)
            || (p["author"] && match(p["author"]))
            || (p['download']['spn'] && p['download']['spn']['file'] && match(p['download']['spn']['file']))
            || (undefined !== p.categories.find(c => { match(c) }))
        })
      }
    },
    warnNoControls: function() {
      return this.selected.map(i => this.programs[i]).filter(p => {
        return !(p["controls"] && p["controls"].length == 3)
      })
    },
    arduinoCode: function() {
      let labels = () => {
        let rv = this.selected.map(i => {
          let p = this.programs[i]
          let controls = p.controls || []
          if (controls.length < 3) {
            let start = controls.length
            controls.length=3
            controls = controls.fill("-", start, 3)
          }
          let line1 = p["line1"] || p.name
          let line2 = p["line2"] || ""
          return [
            line1,
            line2,
            controls
          ]
        })
        .flat(Infinity)
        .map(l => '"' + l + "\\0" + '"')

        if (rv.length < 8*5) {
          for (let i = (rv.length/5); i < 8; i++) {
            rv.push('"N/A\\0"', '"-\\0"', '"-\\0"', '"-\\0"', '"-\\0"')
          }
        }

        return rv
      }
      return `
#include <Wire.h>

/* We're using a 24LC32A */
// Make sure all of these match what's in the pedal's code, too.
#define EEPROM_ADDRESS B1010000 // 1010 + 3 bits for pins 1,2,3
#define BUFFER_SIZE 30 // It has a 32 byte page write buffer, but we use as little as possible to save space on the arduino's RAM.
#define PAGE_SIZE 32
#define EEPROM_CLOCK_SPEED 400000


/* This is interpretted as sets of 5 strings: the program name, optional line 2 of program name, then 3 control labels.
*/
#define NUM_STRINGS 5  // 5 strings per program
#define NUM_PROGRAMS 8 // 8 programs per bank
#define NUM_BANKS 1   // one bank per eeprom. V1 of the pedal also stored the internal ROM bank on here.
char *labels[] = {
  ${labels().join(",\n")}
};



void setup() {
  Serial.begin(9600);

  Wire.begin();
  Wire.setClock(EEPROM_CLOCK_SPEED);

  unsigned int address = 0x0;
  for (int i = 0; i < NUM_STRINGS * NUM_PROGRAMS * NUM_BANKS; i++) {
    Serial.print(address);
    Serial.print(": ");
    Serial.println(labels[i]);
    writeEEPROMPage(address, labels[i]);
    address = address + PAGE_SIZE;
  }

  Serial.println("***********DONE************");
}

void loop() {
}

/* NOTE: This is not general purpose. It's only useful for writing within a single page.
    Address needs to be the start of a page.
*/
void writeEEPROMPage(unsigned int address, char *data)
{
  unsigned char i = 0;

  Wire.beginTransmission(EEPROM_ADDRESS);

  Wire.write((int)(address >> 8)); // most significant byte
  Wire.write((int)(address & 0xFF)); // least significant byte

  while (i < BUFFER_SIZE) {
    // Serial.println(i);
    // Serial.println(data[i]);
    Wire.write((byte) data[i]);
    if (data[i] == '\\0') {
      break;
    }
    i++;
  }

  //Serial.println("Ending transmission");
  Wire.endTransmission();
  //Serial.println("Ended");
  delay(6);  // needs 5ms for page write
}
      `
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.warning {
  width: 80%;
  background-color: #ffd9d6;
  color: #000;
  border: 3px solid red;
}
textarea {
  margin-top: 2rem;
}
.setup {
  margin-bottom: 2rem;
  padding: 10px;
  border: 1px dashed #000;
}
</style>
