// Global Objects
var model = new Ngrams();
var seq = new Segmenter();

while(window.midiBridge == undefined) { } // Wait for MIDIBridge

midiBridge.init({
    
    ready: function() {
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
        //console.log(midiEvent);
    }
    
});


// SEQUENCER -> NGRAMS

/*seq.onNewChord = function(chord) {
    model.feed(chord);
    updateScore();
};*/

seq.onNewChord = function(chord) {
    setHTML("chord",chord.join('-'));
}

seq.onFlush = function() {
    model = new Ngrams();
}
                
// NGRAMS -> SCORER
    
function updateScore() {
    var grams = model.rank().splice(1,5);
    var candidates = [];
    grams.forEach(function(ng) {
        candidates.push(API.bestMatch(ng));
    });
    var scores = {};
    candidates.forEach(function(cand) {
        scores[cand] = scores[cand] + 1;
    });
}
    