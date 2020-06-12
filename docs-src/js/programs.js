var categories = [
  "Reverb",
  "Delay",
  "Flanger",
  "Tremolo",
  "Vibrato",
  "Phaser",
  "Chorus",
  "Octave",
  "Pitch",
  "Distortion",
  "Other",
  "Wild",
  "Bass"
];
var rom_programs = [
  {
    name: "Chorus + Reverb",
    controls: ["Reverb mix", "Rate", "Chorus mix"],
  },
  {
    name: "Flanger + Reverb",
    controls: ["Reverb mix", "Rate", "Flanger mix"],
  },
  {
    name: "Tremolo + Reverb",
    controls: ["Reverb mix", "Rate", "Tremolo mix"],
  },
  {
    name: "Pitch shift",
    controls: ["Pitch +/- 4 semitones", "-", "-"],
  },
  {
    name: "Pitch Echo",
    controls: ["Pitch", "Delay", "Echo mix"],
  },
  {
    name: "Reverb 1",
    controls: ["Time", "High filter", "Low filter"],
  },
  {
    name: "Reverb 2",
    controls: ["Time", "High filter", "Low filter"],
  }
];

var programs = [
  {
    id: "aa",
    name: "Plate Reverb",
    fav: true,
    description: "By spinsemi",
    categories: ["Reverb"],
    controls: ["Pre-delay", "Time", "Damping"],
    file: "spinsemi/3K_V1_2_PLATE.spn",
    application: "Mixer",
  },
  {
    id: "ab",
    name: "Plate Reverb",
    description: "Dattorro Mix Reverb. By mdroberts.",
    categories: ["Reverb"],
    controls: ["Pre-delay", "Time", "Damping"],
    file: "dervish/dattorro-mixed/dattorro-var_predelay-var_damping-2k.spn",
  },
  {
    id: "ac",
    name: "Plate Reverb",
    description: "By mdroberts, from Dattorro's paper",
    categories: ["Reverb"],
    controls: ["Reverb level", "Reverb time", "Damping"],
    file: "dattorro.spn",
  },
  {
    id: "ad",
    name: "Plate Reverb",
    description: "Dattorro Mix Reverb. By mdroberts.",
    categories: ["Reverb"],
    controls: ["Pre-delay", "Time", "Filter"],
    file: "dervish/dattorro-mixed/dattorro-var_filter-var_predelay.spn",
  },
  {
    id: "ae",
    name: "Hall Reverb",
    fav: true,
    categories: ["Reverb"],
    controls: ["Pre-delay", "Reverb time", "Damping"],
    file: "spinsemi/3K_V1_0_Hall.spn",
    application: "Mixer",
  },
  {
    id: "af",
    name: "Room Reverb",
    fav: true,
    categories: ["Reverb"],
    controls: ["Pre-delay", "Reverb time", "Damping"],
    file: "spinsemi/3K_V1_1_Room.spn",
  },
  {
    id: "ag",
    name: "Gated Reverb",
    categories: ["Reverb"],
    controls: ["Pre-delay", "Gate time", "Damping"],
    file: "spinsemi/3K_V1_3_GATED.spn",
    application: "Mixer",
  },
  {
    id: "ah",
    name: "Echo Reverb",
    categories: ["Reverb", "Delay"],
    controls: ["Delay", "Repeat", "Reverb"],
    file: "spinsemi/3K_V1_4_ECHO-REV.spn",
    application: "Mixer",
  },
  {
    id: "ai",
    name: "Chorus Reverb",
    categories: ["Reverb","Chorus"],
    controls: ["Chorus width", "Sweep rate", "Reverb"],
    file: "spinsemi/3K_V1_6_CHOR-REV.spn",
    application: "Mixer",
  },
  {
    id: "aj",
    fav: true,
    name: "DROLO Flanger",
    description: "This is an all-around great flanger, that gives you a wide 'Range' and 'Feedback' so you can be as practical or out-of-this-world as you'd like",
    categories: ["Flanger"],
    controls: ["Rate", "Feedback", "Range"],
    file: "drolo/flanger.spn",
  },
  {
    id: "ak",
    name: "Holy City Flanger",
    description: "The rate is inversely tied to the width, which makes it impossible to dial in a particular sound, but in some ways that makes it more fun to play. You learn to go with it, and let it lead you down new creative road.",
    categories: ["Flanger"],
    controls: ["LFO Rate / Width", "Resonance", "Delay Offset"],
    file: "holy-city-audio/new-flanger.spn",
  },
  {
    id: "al",
    name: "Phase-Flanger",
    categories: ["Flanger", "Phaser"],
    controls: ["Feedback (+/-)", "Range", "Speed"],
    file: "slacker-bf/bf_phaser.spn"
  },
  {
    id: "am",
    name: "Flange-verb",
    categories: ["Flanger", "Reverb"],
    controls: ["Reverb", "Rate", "Feedback"],
    file: "spinsemi/GA_DEMO_FLANGE.spn",
  },
  {
    id: "an",
    name: "Flanger",
    categories: ["Flanger"],
    description: "This is a really cool sounding flanger, but I'm not yet sure how to describe it. Something is ... weird, about it. Also the 'delay' control doesn't have much effect.",
    controls: ["Delay", "Rate", "Width"],
    file: "spinsemi/3K_V1_7_FLANGE.spn",
  },
  {
    id: "ao",
    name: "Tremolo w/ selectable wave shapes",
    fav: true,
    categories: ["Tremolo"],
    description: "This has 6 different wave shapes to choose from: sine, hump, hyper-triangle, triangle, trapezoid, square",
    controls: ["Wave shape", "Depth", "Speed"],
    file: "tremolo-shapes-reduced.spn",
  },
  {
    id: "ap",
    name: "Chorus",
    categories: ["Chorus"],
    controls: ["Reverb", "Rate", "Level"],
    file: "spinsemi/GA_DEMO_CHORUS.spn",
  },
  {
    id: "aq",
    name: "Echo with Repeats",
    categories: ["Delay"],
    controls: ["Reverb level", "Delay", "Echo level"],
    file: "spinsemi/GA_DEMO_ECHO_RPT.spn",
  },
  {
    id: "ar",
    name: "Echo",
    categories: ["Delay"],
    controls: ["Reverb level", "Delay", "Echo level"],
    file: "spinsemi/GA_DEMO_ECHO.spn",
  },
  {
    id: "as",
    name: "Phase shifter",
    fav: true,
    categories: ["Phaser"],
    controls: ["Reverb", "Rate", "Width"],
    file: "spinsemi/GA_DEMO_PHASE.spn",
    application: "Guitar amplifier",
  },
  {
    id: "at",
    name: "Tremolo + Reverb",
    fav: true,
    categories: ["Tremolo", "Reverb"],
    controls: ["Reverb", "Rate", "Level"],
    file: "spinsemi/GA_DEMO_TREM.spn",
  },
  {
    id: "au",
    name: "Vibrato (after strike)",
    fav: true,
    categories: ["Vibrato"],
    controls: ["Reverb", "Rate", "Width"],
    file: "spinsemi/GA_DEMO_VIBRATO.spn",
  },
  {
    id: "av",
    name: "Auto-Wah",
    fav: true,
    categories: ["Other","Filter"],
    controls: ["Reverb", "Sensitivity", "Filter Q / Level"],
    file: "spinsemi/GA_DEMO_WAH.spn",
  },

  {
    id: "aw",
    name: "Reverb + HP + LP",
    description: "Reverb plus 2-pole high-pass and 2-pole low-pass",
    categories: ["Reverb","Filter"],
    controls: ["Reverb", "High Pass Filter", "Low Pass Filter"],
    file: "spinsemi/dance_ir_h_l.spn",
  },
  {
    id: "ax",
    name: "Reverb + Flange + LP",
    fav: true,
    description: "Reverb plus flange plus 4-pole low pass. Zero delay with flanger fully counter-clockwise. If you take the time to dial in the LP filter, and adjust the wet/dry mix, you can get some amazing sounds that have a rare blend of being both unusual and very usable.",
    categories: ["Reverb","Filter","Flanger"],
    controls: ["Reverb", "Flanger", "Low Pass Filter"],
    file: "spinsemi/dance_ir_fla_l.spn",
  },
  {
    id: "ay",
    name: "Reverb + Pitch + LP",
    description: "Reverb plus pitch plus 4-pole low-pass. Perhaps a bit laggy? Pitch is down only.",
    categories: ["Reverb","Pitch","Filter"],
    controls: ["Reverb", "Pitch", "Filter"],
    file: "spinsemi/dance_ir_ptz_l.spn",
  },

  {
    id: "az",
    name: "Pitch + Reverb for karaoke apps",
    categories: ["Pitch","Reverb"],
    file: "spinsemi/key_rev.spn",
    application: "Karaoke",
  },
  {
    id: "aA",
    name: "Reverb/RT/D/F",
    description: "Reverb program that allows three controls, reverb time, diffusion and high/low frequency damping",
    categories: ["Reverb"],
    file: "spinsemi/rev_rt_d_f.spn",
  },

  {
    id: "aB",
    name: "Plate Reverb: Very Tight",
    categories: ["Reverb"],
    controls: ["Reverb time", "Low freq loss", "High freq loss"],
    description: "Very tight, characterized by extreme density, slight tinnyness, explosive initial sound",
    file: "rev_pl_3.spn",
  },
  {
    id: "aC",
    name: "Plate Reverb: Tight",
    description: "Tight, characterized by very high density, slight tinnyness, explosive initial sound",
    categories: ["Reverb"],
    controls: ["Reverb time", "Low freq loss", "High freq loss"],
    file: "rev_pl_2.spn",
  },
  {
    id: "aD",
    name: "Plate Reverb: Lush",
    description: "Lush (large), characterized by very high density, explosive initial sound, large",
    categories: ["Reverb"],
    controls: ["Reverb time", "Low freq loss", "High freq loss"],
    file: "rev_pl_1.spn",
  },
  {
    id: "aE",
    name: "Distortion",
    categories: ["Distortion","Code snippet"],
    controls: ["-","-","-"],
    file: "spinsemi/dist.spn",
  },

  {
    id: "aF",
    name: "Dual LFO Chorus",
    categories: ["Chorus"],
    file: "dervish/dual-lfo-chorus.spn",
    controls: ["Rate 1", "Rate 2", "Depth"],
    description: "Chorus with Rate and Depth controls and sounds just like a normal chorus but adds in the 2nd rate control to spook things up a bit. Rate 2 completely CCW turns it off.",
  },

  {
    id: "aG",
    name: "Plate Reverb + Shimmer",
    description: "Dattorro Mix Reverb",
    categories: ["Reverb","Shimmer"],
    controls: ["Shimmer", "Reverb time", "Damping"],
    file: "dervish/dattorro-shimmer/dattorro-shimmer_val-lvl.spn",
  },
  {
    id: "aH",
    name: "Plate Reverb + Octave + Shimmer",
    description: "Dattorro Mix Reverb",
    categories: ["Reverb","Shimmer","Octave"],
    controls: ["Shimmer level", "Time", "Damping"],
    file: "dervish/dattorro-mixed/dattorro-shimmer_oct_var-lvl.spn",
  },
  {
    id: "aI",
    name: "Plate Reverb + LP Filter",
    description: "Dattorro Mix Reverb",
    categories: ["Reverb"],
    file: "dervish/dattorro-mixed/dattorro-var_filter-var_damping.spn",
    controls: ["Filter", "Time", "Damping"],
  },
  {
    id: "aJ",
    name: "Plate Reverb + Octave",
    description: "Dattorro plate reverb with fixed 1 oct frequency pitch shift",
    categories: ["Reverb","Octave","Pitch"],
    controls: ["Shift level", "Time", "Damping"],
    file: "dervish/dattorro-mixed/dattorro_1oct_pitch-ip+fb-2k.spn",
  },
  {
    id: "aK",
    name: "Plate Reverb + Pitch Shift + Feedback",
    description: "Dattorro reverb with variable frequency pitch shift applied to input signal, and feedback",
    categories: ["Reverb","Pitch"],
    controls: ["Frequency shift", "Time", "Damping"],
    file: "dervish/dattorro-mixed/dattorro_var_pitch-ip+fb-4k.spn",
  },
  {
    id: "aL",
    name: "Plate Reverb + Pitch Shift",
    description: "Dattorro reverb with variable frequency pitch shift applied to input signal",
    categories: ["Reverb","Pitch"],
    controls: ["Frequency shift", "Time", "Damping"],
    file: "dervish/dattorro-mixed/dattorro_var_pitch-ip-4k.spn",
  },
  {
    id: "aM",
    fav: true,
    name: "Stereo Pitch Transposer w/ Feedback and Delay",
    description: "Probably not very practical, but crazy fun",
    categories: ["Delay", "Pitch", "Wild"],
    controls: ["Pitch", "Feedback", "Delay"],
    file: "dervish/pitch+fb+delay.spn",
  },
  {
    id: "aN",
    name: "Single Head Tape Echo + Spring Reverb",
    categories: ["Reverb","Delay"],
    controls: ["Time", "Feedback", "Reverb"],
    file: "dervish/drv102/dv102-1head-reverb.spn",
  },
  {
    id: "aO",
    name: "Dual Head Tape Echo + Spring Reverb",
    fav: true,
    categories: ["Reverb","Delay"],
    controls: ["Time", "Feedback", "Reverb"],
    file: "dervish/drv102/dv102-2head-reverb.spn",
  },
  {
    id: "aP",
    name: "Single Head Tape Echo + Spring Reverb w/ Ping Pong",
    categories: ["Reverb","Delay"],
    controls: ["Time", "Feedback", "Level"],
    file: "dervish/drv102/dv102-pp-1head-reverb.spn",
  },
  {
    id: "aQ",
    name: "Dual Head Tape Echo w/ Ping Pong",
    categories: ["Delay"],
    file: "dervish/drv103/dv103-1head-pp.spn",
    controls: ["Time", "Feedback", "Damping"],
  },
  {
    id: "aR",
    name: "Dual Head Tape Echo + Spring Reverb w/ Ping Pong",
    categories: ["Reverb","Delay"],
    controls: ["Time", "Feedback", "Level"],
    file: "dervish/drv102/dv102-pp-2head-reverb.spn",
  },
  {
    id: "aS",
    name: "Single Head Tape Echo",
    categories: ["Delay"],
    controls: ["Time", "Feedback", "Damping"],
    file: "dervish/drv103/dv103-1head.spn",
  },
  {
    id: "aT",
    name: "Single Head Tape Echo + Reverb",
    categories: ["Delay", "Reverb"],
    controls: ["Time", "Feedback", "Damping"],
    file: "dervish/drv103/dv103-1head-4xreverb.spn",
  },
  {
    id: "aU",
    name: "Ping Pong 2:1",
    categories: ["Delay"],
    file: "dervish/drv103/dv103-1head-pp-2_1.spn",
  },
  {
    id: "aV",
    name: "Dual Head Tape Echo + Plate Reverb, w/ Ping Pong",
    controls: ["Time", "Feedback", "Damping"],
    description: "reverb code is a 2 tap version of the Spin OEM1 Vocal Plate",
    categories: ["Delay", "Reverb"],
    file: "dervish/drv103/dv103-1head-pp-2_1-4xreverb.spn",
  },
  {
    id: "aW",
    name: "Dual Head Tape Echo + Plate Reverb",
    description: "reverb code is a 2 tap version of the Spin OEM1 Vocal Plate",
    categories: ["Delay", "Reverb"],
    controls: ["Time", "Feedback", "Damping"],
    file: "dervish/drv103/dv103-2head-2_1-reverb.spn",
  },
  {
    id: "aX",
    name: "Ping Pong: Basic Wonky",
    description: "Basic pingpong with adjustable feedback & damping ; damping has hpf & lpf ; some added wonkiness",
    categories: ["Delay"],
    controls: ["Time", "Feedback", "Damping"],
    file: "dervish/pingpong/pp-basic-wonky.spn",
  },
  {
    id: "aY",
    name: "Ping Pong: Basic",
    description: "Basic pingpong with adjustable feedback & damping ; damping has hpf & lpf",
    categories: ["Delay"],
    controls: ["Time", "Feedback", "Damping"],
    file: "dervish/pingpong/pp-basic.spn",
  },
  {
    id: "aZ",
    name: "Ping Pong: Simple",
    description: "Simple ping pong delay with adjustable feedback & lpf damping",
    categories: ["Delay"],
    file: "dervish/pingpong/pp-simple.spn",
  },
  {
    id: "ba",
    name: "Ping Pong with Dual Taps",
    categories: ["Delay"],
    file: "dervish/pingpong/pp-dubble.spn",
    controls: ["Time 1", "Time 2", "Feedback"],
  },
  {
    id: "bb",
    name: "Ping Pong: Triple",
    description: "Ping pong delay with 3 taps - left, right, centre ; centre is mixed with both left & right taps",
    categories: ["Delay"],
    file: "dervish/pingpong/pp-tripple.spn",
    controls: ["Time 1", "Time 2", "Time 3"],
  },
  {
    id: "bc",
    name: "Triple Tap Cascaded Delay",
    fav: true,
    categories: ["Delay"],
    controls: ["Time 1", "Time 2", "Time 3"],
    file: "dervish/triple/tripple_echo_cascaded.spn",
  },
  {
    id: "bd",
    name: "Triple Tap Cascaded Delay w/ Chorus",
    categories: ["Delay", "Chorus"],
    controls: ["Time 1", "Time 2", "Time 3"],
    file: "dervish/triple/tripple_echo_cascaded_stereo+chorus.spn",
  },
  {
    id: "be",
    name: "Triple Tap Delay - Parallel",
    description: "taps are treated in parallel ; feedback & damping are fixed",
    categories: ["Delay"],
    controls: ["Time 1", "Time 2", "Time 3"],
    file: "dervish/triple/tripple_echo_parallel.spn",
  },
  {
    id: "bf",
    name: "Triple Tap Delay - Parallel, Varying Feedback",
    description: "taps are treated in parallel ; feedback & damping are fixed, but f/b varies slighly depending on delay time (longer time, less f/b) ; damping for each tap is different",
    categories: ["Delay"],
    controls: ["Time 1", "Time 2", "Time 3"],
    file: "dervish/triple/tripple_echo-var_fb.spn",
  },
  {
    id: "bg",
    name: "Triple Tap Delay - Parallel, Varying Feedback, w/ Chorus",
    description: "taps are treated in parallel ; feedback & damping are fixed, but f/b varies slighly depending on delay time (longer time, less f/b) ; damping for each tap is different; With chorus",
    categories: ["Delay", "Chorus"],
    controls: ["Time 1", "Time 2", "Time 3"],
    file: "dervish/triple/tripple_echo-var_fb+chorus.spn",
  },

  {
    id: "bh",
    name: "Freeverb",
    description: "Freeverb is a stereo reverb unit based on Jezar's public domain C++ sources, composed of eight parallel comb filters on both channels, followed by four allpass units in series. The filters on the right channel are slightly detuned compared to the left channel in order to create a stereo effect.",
    categories: ["Reverb"],
    file: "freeverb.spn",
    controls: ["Comb feedback", "-", "-"],
  },
  {
    id: "bi",
    name: "Greenwood Delay",
    categories: ["Delay"],
    controls: ["Speed", "Time", "Randomness"],
        file: "greenwood-delay.spn",
  },
  {
    id: "bj",
    name: "Pitch Transposer",
    categories: ["Pitch"],
    controls: ["Pitch", "-", "-"],
    file: "pitch-transpose-stereo.spn",
  },
  {
    id: "bk",
    name: "Reverse Reverb",
    categories: ["Reverb", "Delay", "Wild"],
    controls: ["Pre-delay", "Decay time", "Damping"],
    file: "RevRev.spn"
  },
  {
    id: "bl",
    name: "Hall Reverb w/ Shimmer",
    categories: ["Reverb", "Shimmer"],
    controls: ["Damping", "Feedback", "Decay"],
    file: "shimmer-1.spn"
  },
  {
    id: "bm",
    name: "New Shimmer Reverb",
    categories: ["Reverb", "Shimmer"],
    controls: ["Shimmer", "Reverb level", "Reverb time"],
    file: "shimmer-2.spn",
  },
  {
    id: "bn",
    name: "Octave Up and Down",
    categories: ["Octave","Pitch"],
    controls: ["Mix", "Octave up", "Octave down"],
    file: "up-down-octaver.spn",
  },
  {
    id: "bo",
    name: "Ring Modulators w/ Chorus",
    description: "You can get some interesting and rich rhythms with this.",
    categories: ["Chorus", "Other"],
    controls: ["Blend", "Carrier offset", "Chorus"],
    file: "stereo-ring-modulators-with-chorus.spn",
  },
  {
    id: "bp",
    name: "Triple Delay w/ Feedback",
    categories: ["Delay"],
    controls: ["Time 1", "Times 2 & 3", "Feedback"],
    file: "triple-delay-feedback.spn",
  },
  {
    id: "bq",
    name: "Dual Flange Multi Tap Delay",
    categories: ["Delay","Flanger"],
    controls: ["Feedback", "Resonance and time", "Return level"],
    file: "stereo-dual-flange-multi-tap-delay.spn",
  },
  {
    id: "br",
    name: "Modulated Echo",
    categories: ["Delay"],
    controls: ["Time", "Depth", "Level"],
    file: "modulated-echo.spn",
  },
  {
    id: "bs",
    name: "Interesting - w/ Overdrive",
    description: "There is an overdrive going to the flanger and highpass/delay, but the reverb is driven directly from the input.",
    categories: ["Flanger", "Filter", "Delay", "Reverb", "Distortion"],
    file: "interesting-1.spn",
  },
  {
    id: "bt",
    name: "Interesting - v1",
    description: "Flanger and highpass/delay, but the reverb is driven directly from the input. With some envelope control on the filter.",
    categories: ["Flanger", "Filter", "Delay", "Reverb"],
    file: "interesting-2.spn",
  },
  {
    id: "bu",
    name: "Faux Phase Shifter",
    description: "Sounds like a phaser but in fact it is not one, strictly speaking. It is built up from resonant high pass and low pass filters mixed together",
    categories: ["Phaser"],
    file: "faux-phaser.spn",
  },
  {
    id: "bv",
    name: "Faux Phase Shifter - extra delay",
    description: "Sounds like a phaser but in fact it is not one, strictly speaking. It is built up from resonant high pass and low pass filters mixed together. Adds another delay to the resonant low pass",
    categories: ["Phaser"],
    file: "faux-phaser-2.spn",
  },
  {
    id: "bw",
    name: "Dual-Rate Chorus",
    description: "Rate and Depth controls and sounds just like a normal chorus but adds in the 2nd rate control to spook things up a bit",
    categories: ["Chorus"],
    controls: ["Chorus level", "Rate 1", "Rate 2"],
    file: "chorus-dual-rate.spn",
  },
  {
    id: "bx",
    name: "Oil can delay",
    fav: true,
    categories: ["Delay", "Wild"],
    file: "holy-city-audio/oil-can-delay.spn",
    controls: ["Time & rate", "Chorus width", "Feedback"],
  },
  {
    id: "by",
    name: "Room reverb: 3-4-5",
    description: "This one uses 3 delay lines with relative lengths in a ratio of 3 - 4 - 5",
    categories: ["Reverb"],
    file: "holy-city-audio/room-reverb-3-4-5.spn",
  },
  {
    id: "bz",
    name: "Spacedash",
    description: "I'm not sure what this is doing it, but it's pretty cool.",
    categories: ["Other", "Wild"],
    controls: ["Intensity", "Rate", "Mix"],
    file: "madbeanpedals/spacedash.spn",
  },
  {
    id: "bA",
    name: "Choir Saw",
    description: "A delay with pitch shift in the feedback path. Kind of a discount EQD Rainbow Machine. It is a delay with pitch shifting and tremolo. The result is something pretty unique and also musically interesting. The top knob P0 sets the delay time from long to short (about 800ms to a few ms). It also cross-fades into the pitch-shift as it is turned up. So, when the delay gets shorter more pitch shift is available in the feedback path. This gets really interesting when you set the delay to slow, feedback high and trem fast. Try it!",
    categories: ["Delay", "Pitch", "Tremolo","Wild"],
    controls: ["Delay time", "Feedback and Pitch Volume", "Speed"],
    file: "madbeanpedals/choir-saw.spn",
  },
  {
    id: "bB",
    name: "Parallax",
    fav: true,
    description: "Emulates the Function F(x) Parallax pedal. It's a tremolo with a phase shifter and speed controls for each.  It's really easy to make some out-of-this-world sounds - great for experimental, trippy music - but with some careful tweaking you can achieve som really beautiful effects that are simpler to harness",
    categories: ["Tremolo", "Phaser", "Wild"],
    controls: ["Phaser speed", "Feedback and Width", "Tremolo speed"],
    file: "madbeanpedals/parallax.spn",
  },
  {
    id: "bC",
    name: "Spring Reverb + Tremolo",
    fav: true,
    description: "You can cut the tremolo depth if you want just a good, spring reverb",
    categories: ["Tremolo", "Reverb"],
    controls: ["Reverb", "Rate", "Depth"],
    file: "spring_verb.spn",
  },

  {
    id: "bD",
    name: "Firesledge Flanger (bass)",
    description: "A basic flanger. Designed for bass",
    categories: ["Flanger", "Bass"],
    controls: ["Speed", "Depth", "Feedback"],
    file: "firesledge/bass-fv1-p0-flanger.spn",
  },
  {
    id: "bE",
    name: "Phaser OD (bass)",
    description: "A basic phaser with some overdrive in the feedback path. Designed for bass",
    categories: ["Phaser", "Bass"],
    controls: ["Speed", "Depth", "Feedback"],
    file: "firesledge/bass-fv1-p1-phaser.spn",
  },
  {
    id: "bF",
    name: "Delay OD (bass)",
    description: "A delay with filtered overdrive in the feedback path. Designed for bass",
    categories: ["Delay", "Bass"],
    controls: ["Time", "Feedback", "Dry/wet mix"],
    file: "firesledge/bass-fv1-p2-delay.spn",
  },
  {
    id: "bG",
    name: "Firesledge Reverb (bass)",
    description: "Simple reverberation effect. Designed for bass",
    categories: ["Reverb", "Bass"],
    controls: ["Time", "Filter", "Mix"],
    file: "firesledge/bass-fv1-p3-reverb.spn",
  },
  {
    id: "bH",
    name: "Autowah (bass)",
    description: "Automatic wah effect based on the signal volume. Designed for bass. 'Amount' control is bidirectional (mid is neutral).",
    categories: ["Filter", "Bass", "Other"],
    controls: ["Amount", "Resonance", "Frequency"],
    file: "firesledge/bass-fv1-p4-autowah.spn",
  },
  {
    id: "bI",
    name: "Firesledge Distortion",
    description: "Simple distortion with variable gain, tone and mix. Designed for bass. When using with a guitar, the tone knob isn't terribly useful, but once you find a good spot for it, it really rips.  You can get some thick, meaty fuzz with this.",
    categories: ["Distortion", "Bass"],
    controls: ["Gain", "Tone", "Dry/wet mix"],
      file: "firesledge/bass-fv1-p5-disto.spn",
  },
  {
    id: "bJ",
    name: "Filter tremolo+",
    description: "Harmonic tremolo with distortion. Designed for bass",
    categories: ["Tremolo", "Distortion", "Bass"],
    file: "firesledge/bass-fv1-p6-filter-tremolo-disto.spn",
    controls: ["Speed", "Resonance", "Gain"],
  },
  {
    id: "bK",
    name: "Starfield+",
    fav: true,
    description: "Harmonic tremolo mixed with a delay. Don't overdue the mix and you can create some amazing thick, rich, soundscapes.",
    categories: ["Delay", "Tremolo", "Bass", "Wild"],
    controls: ["Delay", "Speed + Delay/Tremolo mix", "Dry/wet mix"],
    file: "firesledge/bass-fv1-p7-harm-trem-delay.spn",
  },

  {
    id: "bL",
    name: "8 second delay",
    description: "This delays an input by eight seconds. It inteleaves the signal 8 ways in a single max sized delay",
    categories: ["Delay", "Code snippet","Wild"],
    file: "8_seconds_delay.spn",
    application: "Code snippet",
  },
  {
    id: "bN",
    name: "Aliaser",
    controls: ["Sample rate", "-", "-"],
    categories: ["Other"],
    file: "aliaser.spn",
  },
  {
    id: "bO",
    name: "Bit crusher",
    categories: ["Other", "Wild"],
    controls: ['-','-','-'],
    file: "crusher.spn",
  },
  {
    id: "bP",
    name: "Multi program pitch shifter",
    description: "Inspired by commercial pedals. It has 6 programs. The first 4 are dual shifts (3 note harmonies). Fifth program is a single manual shift, with +/- 1 octave controled by Cross Fade knob. Sixth is a detune chorus, with shift set by Cross Fade knob.",
    categories: ["Pitch"],
    controls: ["Program select", "Cross fade", "Wet / dry mix"],
    file: "multipitch.spn",
  },
  {
    id: "bM",
    name: "Reverse delay",
    description: "Simplified part of A+ Paradox delay",
    controls: ["-", "Feedback", "Delay"],
    categories: ["Delay","Wild"],
    file: "afx_reverse_delay.spn",
  },
  {
    id: "bQ",
    name: "Reverse delay",
    categories: ["Delay", "Wild"],
    controls: ["Length", "-", "-"],
    file: "reverse_delay.spn",
  },
  {
    id: "bR",
    name: "Reverb + Shimmer (Version 6)",
    categories: ["Pitch"],
    controls: ["Reverb time", "Treble", "Shimmer"],
    file: "shimmer_drAlx.spn",
  },
  {
    id: "bS",
    name: "Slocum Phase Shifter",
    fav: true,
    description: "I really enjoy using this. It's a good, solid phaser, but can really turn up its personality if you crank up the width and add more stages.",
    categories: ["Phaser", "Wild"],
    file: "slocum-phaser.spn",
    controls: ["Phase rate", "Sweep width", "Number of stages"],
  },

  {
    id: "bT",
    name: "Geoffrey: Pitch shifted delay",
    description: "Pitch shift is +M3rd, +5th, +7th, +1 Octave",
    categories: ["Pitch", "Delay", "Wild"],
    controls: ["Delay", "Pitch select", "Feedback"],
    file: "slacker-bf/bf_geoffrey.spn",
  },
  {
    id: "bU",
    name: "New octaver",
    categories: ["Other", "Pitch"],
    controls: ["Dry mix", "Octave up", "Octave down"],
    file: "slacker-bf/bf_newoctaver.spn",
  },
  {
    id: "bV",
    name: "Digifuzzer",
    fav: true,
    categories: ["Distortion", "Other", "Wild"],
    controls: ["Sample rate reduction", "Bit depth + distortion", "Volume"],
    file: "slacker-bf/bf_digifuzzer.spn",
  },
  {
    id: "bW",
    name: "Johnny",
    categories: ["Other"],
    controls: ["Speed", "Max delay", "Randomness"],
    file: "slacker-bf/bf_johnny.spn",
  },
  {
    id: "bX",
    name: "Envelope Phaser",
    categories: ["Filter", "Phaser"],
    controls: ["Rate", "Depth", "Regen"],
    file: "drolo/envelope-phaser.spn",
  },
  {
    id: "bY",
    name: "Filter: Env, LP, HP, Up",
    fav: true,
    description: "This is a pretty good auto-wah that lets you tweak filter types for different flavors.",
    controls: ["Sensitivity", "Filter Type", "Volume"],
    categories: ["Other", "Filter"],
    file: "drolo/filter-env-LP-HP-up.spn",
  },
  {
    id: "bZ",
    name: "Pitch Step Glider",
    fav: true,
    categories: ["Pitch", "Wild"],
    controls: ["Rate","Depth","Glide"],
    file: "drolo/pitch-step-glider.spn",
  },
  {
    id: "ca",
    name: "Random Loop Delay",
    categories: ["Delay", "Wild"],
    file: "drolo/random-loop-delay.spn",
  },
  {
    id: "cb",
    name: "DRolo Reverb",
    fav: true,
    categories: ["Reverb"],
    controls: ["Decay", "Pre-delay", "Filter"],
    file: "drolo/reverb.spn",
  },
  {
    id: "cc",
    name: "Ring Pitchulator",
    description: "If you want to prepare to be able to talk to our future robotic, alien overlords, make sure to put this on your pedalboard. Works especially well for single notes.",
    categories: ["Other", "Pitch", "Wild"],
    controls: ["Ringmod rate", "Pitch blend", "Pitch"],
    file: "drolo/ring-pitchulator.spn",
  },
  {
    id: "cd",
    name: "BM Pi",
    categories: ["Distortion"],
    controls: ["Gain", "Tone", "-"],
    file: "bm-pi.spn",
  },
  {
    id: "ce",
    name: "Ping Pong Delay",
    categories: ["Delay"],
    file: "pingpong.spn",
    controls: ["Ping time", "Pong time", "Feedback"],
  },
  {
    id: "cf",
    name: "Soft Clipping Overdrive",
    categories: ["Distortion"],
    file: "softclipping_overdrive.spn",
    controls: ["Gain Threshold", "Volume", "Tone"],
  },

  {
    id: "cg",
    name: "Octave Up",
    controls: ["-", "-", "-"],
    categories: ["Octave"],
    file: "improved_octave_up.spn",
  },
  {
    id: "ch",
    name: "Minimal Reverb",
    categories: ["Reverb"],
    file: "min_rev1.spn",
    controls: ["-", "-", "-"],
  },
  {
    id: "ci",
    name: "Slow Gear",
    categories: ["Other"],
    controls: ["Attack rate", "-", "-"],
    file: "slowgear-2.spn",
    description: "This may be a bit glitchy.",
  },
  {
    id: "cj",
    name: "Slow Gear (simple)",
    controls: ["-", "-", "-"],
    categories: ["Other"],
    file: "slowgear-simple.spn",
  },
  {
    id: "ck",
    name: "Whammy",
    categories: ["Pitch"],
    controls: ["Whammy", "Pitch range", "-"],
    file: "whammy.spn",
  },
  {
    id: "cl",
    name: "Resonator",
    categories: ["Other", "Wild"],
    controls: ["Frequency", "Resonance", "-"],
    file: "resonator.spn",
  }
];

var app = new Vue({
  el: '#bank-builder',
  data: {
    screenWidth: screenWidth(),
    showLoading: true,
    showCategory: {},
    showProgram: {},
    showRom: false,
    showSimpler: false,
    showAdvanced: false,
    showCartContents: false,
    showCode: true, // Some people were missing this and sending me a copy paste of the program names
    showCopied: false,
    showDecoder: false,

    decoderCode: "",

    cartOrdered: [],
    cartById: {},

    message: 'Hello Vue!',
    programs: programs,
    romPrograms: rom_programs,
    categories: categories,
  },
  mounted: function() {
    var code = this.getCodeParam();
    if (code) {
      this.cartOrdered = this.programsFromCode(code);
      var len = this.cartOrdered.length;
      for (var i = 0; i < len; i++) {
        var p = this.cartOrdered[i];
        this.cartById[p.id] = p;
      }
    }

    this.showLoading = false;
    /* Just for checking to make sure the program data above is complete and comprehensive.
    var len = this.programs.length;
    var seen = {};
    for (var i = 0; i < len; i++) {
      var p = this.programs[i];
      if (! p["id"]) {
        console.log(p.name);
      }
      if (seen[p.id]) {
        console.log(p.name);
      }
      if (! p["categories"]) {
        console.log(p.name);
      }
      seen[p.id] = true;
    }
    */
  },
  methods: {
    programsInCategory: function(cat) {
      var len = this.programs.length;
      var rv = [];
      for (var i = 0; i < len; i++) {
        var p = this.programs[i];
        if (p["categories"] && p["categories"].indexOf(cat) !== -1) {
          rv.push(p);
        }
      }
      return rv;
    },
    addProgram: function(program) {
      this.$set(this.cartById, program.id, true);
      this.cartOrdered.push(program);
    },
    removeProgram: function(program) {
      this.$set(this.cartById, program.id, false);
      this.cartOrdered = this.cartOrdered.filter(function(p) {
        return p.id != program.id;
      });
    },
    toggleCategory: function(cat) {
      var val = this.showCategory[cat] || false;
      this.$set(this.showCategory, cat, !val);
    },
    toggleProgram: function(cat, programId) {
      var key = cat + programId;
      var val = this.showProgram[key] || false;
      this.$set(this.showProgram, key, !val);
    },

    showCart: function() {
      this.showCartContents = true;
    },
    hideCart: function() {
      this.showCartContents = false;
    },

    showCodeAndScroll: function() {
      this.showCode = true;

      this.$nextTick(function() {
        var div = document.getElementById("cart-contents");
        div.scrollTop = div.scrollHeight;
      });
    },

    copyCheckoutCode: function() {
      var input = document.getElementById("checkout-code");
      input.select();
      input.setSelectionRange(0, 99999);
      document.execCommand("copy");

      this.showCopied = true;
    },

    getCodeParam: function() {
      var url = window.location.href;
      var regex = new RegExp('[?&]code(=([^&#]*)|&|#|$)');
      var results = regex.exec(url);
      if (!results) return "";
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },

    programsFromCode: function(code) {
      // This is expensive, by design, since it'll be rarely used.
      // i.e. don't bog down everyone elses' experience by creating
      // p_by_id outside of here.
      var rv = [];
      var codes = code.match(/.{1,2}/g);
      var p_by_id = {};
      for (var i = 0; i < this.programs.length; i++) {
        var p = this.programs[i];
        p_by_id[p.id] = p;
      }
      for (var i = 0; i < codes.length; i++) {
        var p = p_by_id[codes[i]];
        if (p) {
          rv.push(p);
        } else {
          return [];
        }
      }
      return rv;
    },
  },
  computed: {
    numBanks: function() {
      return Math.ceil(this.numPrograms / 8);
    },
    numPrograms: function() {
      return this.cartOrdered.length;
    },
    numSlotsLeft: function() {
      return (this.numBanks * 8) - this.numPrograms;
    },
    checkoutCode: function() {
      var rv = "";
      var len = this.cartOrdered.length;
      for (var i = 0; i < len; i++) {
        rv += this.cartOrdered[i].id;
      }
      return rv;
    },
    decoderPrograms: function() {
      // This is expensive, by design, since only I'll be using it.
      // i.e. don't bog down everyone elses' experience by creating
      // p_by_id outside of here.
      var rv = [];
      if (this.decoderCode) {
        rv = this.programsFromCode(this.decoderCode);
        if (rv.length == 0) {
          rv.push({file: "ERROR", id: "ERROR", name: "You found my (not-so-secret) decoder."});
        }
      }
      return rv;
    },
  },
  watch: {
    cartOrdered: function() {
      if (this.cartOrdered.length == 0) {
        this.showCartContents = false;
      }
    }
  }
});

function screenWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}
