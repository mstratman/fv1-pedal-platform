# Mimir's Well

This repository contains everything you need to build the [Mimir's Well](https://mas-effects.com) guitar pedal.

## Writing EEPROMs

The pedal has 2 pairs of EEPROMs. Each pair contains a bank of 8 programs, and has a "Yellow" EEPROM and a "Blue" EEPROM.  The colors aren't significant, and just refer to the color I use when writing each chip's number on it. It's a simple way to avoid getting them mixed up.

There are lots of ways to write to EEPROMs, and this is only one of them.

### Yellow

This holds the program name and control labels for each program in the bank.
I write it using an [Arduino sketch](/v2/arduino/eeprom/eeprom.ino). You can hook it up as follows:

![connecting EEPROM to Arduino for writing](/v1/schematics/eeprom%20prgramming_bb.png)

If you decide to write it another way, that's fine, just look at the Arduino sketch to see how we're storing the data: 5 null-terminated strings for each program, each starting at a page boundary.

### Blue

This holds the FV-1 programs.

You may be be able to write the banks using an arduino and a custom sketch, but I simply use a very inexpensive EEPROM programmer.  Specifically I use a USB CH341 EEPROM programmer.  These can be found for about $5.  You may need to find and install USB drivers. 

I use the [ch341eeprom](https://github.com/command-tab/ch341eeprom) commandline tool on Mac OS X to write the data to the USB programmer.  If you're not on Mac you'll need to find an alternative tool.

To create these banks I do the following:

1. Create a "hex" bank using [SpinAsm assembler](http://spinsemi.com/products.html)
    1. Unfortunately this only runs on Windows. [An alternate assembler](https://github.com/ndf-zz/asfv1) exists but I haven't tried it.
2. Convert it to a "bin" file using the `srec_cat` util from the "srecord" package
    1. `brew install srecord` on Mac
    2. `srec_cat bank-input.hex -Intel -o bank-output.bin -binary`
3. Erase the EEPROM, probably optional
    1. `ch341eeprom -v -s 24c32 -e`
4. Write the bin file
    1. `ch341eeprom -v -s 24c32 -w bank-output.bin`

[Here is a script I use for steps 2-4](https://gist.github.com/mstratman/5ede44bfd3bc87219b2a90b9920d51e1).

## "EEPROM Helper" tool

To help streamline this process I have a really simple tool I use: [eeprom helper](https://github.com/mstratman/fv1-pedal-platform/tree/master/v2/eeprom-helper]

It's just a simple javascript page that lets me check which programs I'll be burning, then it does 2 things:

1. Gives a snippet of arduino code for the burning the Yellow chip, used in the [Arduino sketch mentioned above](/v2/arduino/eeprom/eeprom.ino)
2. Lists the spn files for reference, which is helpful when manually working with SpinAsm Assembler in step 1 while burning the Blue chip.
