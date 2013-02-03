while(window.midiBridge == undefined || window.Segmenter == undefined || window.Ngrams == undefined) { } // Wait for the modules

// Global Objects
var userModel = new Ngrams();
var seq = new Segmenter();
var db = {};
var dbListings = {};

// SEQUENCER -> NGRAMS

seq.onNewChord = function(chord) {
    setHTML("chord",chord.join('-'));
    userModel.push(chord);
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
        //console.log(midiEvent);
    }
    
});

// NGRAMS -> SCORER

userModel.onChartUpdate = function(chart) {
    setHTML("stats",userModel.chart.map(function(k){return k+'   '+userModel.stats[k]}).join('<br>'));
    //setHTML("result",updateScore());
}

function updateScore() {
    var grams = userModel.chart;
    grams.forEach(function(ng) {
        if (!dbListings.hasOwnProperty(ng)) {
            Peachnote.bestMatch(ng).forEach(function(e) {
                if (!db.hasOwnProperty(e.year))
                    db[e.year] = new Ngram();
                db[e.year].update(ng,e.count);
            });
            dbListings[ng] = true;
        }
    });
    return Object.keys(db).map(function(key) {
        return [key, userModel.distance(db[key])];
    }).reduce(function(prev, cur) {
        if (cur[1] < prev[1])
            return cur;
        else
            return prev;
    },Number.MAX_VALUE)[0];
}
    