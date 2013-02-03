while(window.midiBridge == undefined || window.Segmenter == undefined || window.Ngrams == undefined) { } // Wait for the modules

// Global Objects
var userModel = new Ngrams();
var seq = new Segmenter();

// SEQUENCER -> NGRAMS

seq.onNewChord = function(chord) {
    setHTML("chord",chord.join('-'));
    userModel.push(chord);
    setHTML("stats",userModel.stats);
    //updateScore();
};

midiBridge.init({
    
    ready: function() {
        console.log("MIDI Engine loaded succesfully");
    },
    
    error: function() {
        console.log("MIDI Engine ERROR");
    },
    
    data: function(midiEvent) {
        if (midiEvent.statusCode == "NOTE ON") {
            if (midiEvent.data2 == 0) {
                seq.noteOff(midiEvent.data1);
            } else {
                seq.noteOn(midiEvent.data1);
            }
        } else if (midiEvent.statusCode == "NOTE OFF") {
            seq.noteOff(midiEvent.data1);
        }
        console.log(midiEvent);
    }
    
});
                
// NGRAMS -> SCORER

function updateScore() {
    var grams = userModel.chart;
    var candidates = [];
    grams.forEach(function(ng) {
        candidates.push(API.bestMatch(ng));
    });
    var scores = {};
    candidates.forEach(function(cand) {
        scores[cand] = scores[cand] + 1;
    });
}
    