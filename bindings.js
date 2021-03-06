//while(window.midiBridge == undefined || window.Segmenter == undefined || window.Ngrams == undefined) { } // Wait for the modules

// Global Objects
var userModel = new Ngrams();
var seq = new Segmenter();
var db = {};
var dbListings = {};

// Keyboard bindings
Keyboard['d'].bindDown(function() {
    UI.switchDebug();
});

Keyboard['r'].bindDown(function() {
    UI.postFlush();
    userModel.flush();
});

// SEQUENCER -> NGRAMS

seq.onNewChord = function(chord) {
    UI.setChord(chord);
    userModel.push(chord);
};

midiBridge.init({
    
    ready: function() {
        console.log("MIDI Engine loaded succesfully");
        UI.ready();
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
    UI.setStats(userModel.chart.map(function(k){return k+' '+userModel.stats[k]}).join('<br>'));
    UI.setResult(guessLanguage());
}
    
    /*
function updateScore() {
    return Object.keys(db).map(function(key) {
        return [key, userModel.distance(db[key])];
    }).reduce(function(prev, cur) {
        if (cur[1] > prev[1])
            return cur;
        else
            return prev;
    },[null,-Number.MAX_VALUE])[0];
}
*/

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
    ng = ng.replace(' ','+');
    for (var year in stats) {
        if (stats[year] < 4)
            continue;
        if (!db.hasOwnProperty(year)) {
            db[year] = new Ngrams();
            db[year].chartSize = 0;
        }
        db[year].update(ng,stats[year]);
    }
    dbListings[ng] = 2; // listing created
    UI.setResult(guessLanguage());
}
    
/**
 * Guess language from Ngram
 */var distances;
guessLanguage = function() {
    var language = undefined;
    var score = undefined;
    distances = [];
    for(var lang in db) {
        var distance = userModel.distance(db[lang]);
        distances.push([lang,distance]);
        if((score == undefined || distance < score)) {
            score = distance;
            language = lang;
        }
    }
    return language;
};
    