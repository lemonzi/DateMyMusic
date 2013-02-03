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
    populateDB();
    setHTML("stats",userModel.chart.map(function(k){return k+'   '+userModel.stats[k]}).join('<br>'));
    UI.setResult(updateScore());
}
    
function updateScore() {
    return Object.keys(db).map(function(key) {
        return [key, userModel.distance(db[key])];
    }).reduce(function(prev, cur) {
        if (cur[1] < prev[1])
            return cur;
        else
            return prev;
    },Number.MAX_VALUE)[0];
}

function populateDB() {
    var grams = userModel.chart;
    grams.forEach(function(ng) {
        if (!dbListings.hasOwnProperty(ng)) {
            dbListings[ng] = 1; // awaiting response
            Peachnote.query(ng);
        }
    });
}
                
Peachnote.callback = function(data) { 
    var ng = Object.keys(data)[0];
    console.log('Received ngram: '+ng);
    var stats = data[ng];
    Object.keys(stats).forEach(function(year) {
        if (!db.hasOwnProperty(year))
            db[year] = new Ngrams();
        db[year].update(ng,data[year]);
        dbListings[ng] = 2; // listing created
    });
    UI.setResult(updateScore());
}
    