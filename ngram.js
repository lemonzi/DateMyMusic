// https://github.com/athoune/node-ngram
// Adapted to work in client-side and with arrays instead of strings
// Adapted to generate ngrams given a realtime stream
// Keeps the last 

// UPDATE: raw adding of counts
// PUSH: get ngrams from the buffer and add them

(function(global){ 

    /*
function ngram(arr, min, max) {
    var ngrams = [];
    word = '_' + word + '_';
    for(var i=0; i < word.length; i++) {
        for(var s=min; s <=max; s++) {
            if(i+s <= word.length) {
                var ngram = word.splice(i,s);
                if(ngram != '_')
        ngrams.push(ngram);
            }
        }
    }
    return ngrams;
}
*/

var Ngrams = function() {
    // Attributes
    this.keys = [];
    this.stats = {};
    this.min = 2;
    this.max = 6;
    this.chart = [];
    this.chartSize = 10;
    // User callbacks
    this.onChartUpdate = function(chart) {};
    // Internal stuff
    this._last = [];
    this._ranks = undefined;
    return this;
};

    /*
Ngrams.prototype.feed = function(word) {
    this._ranks = undefined;
    var g = this;
    ngram(word, this.min, this.max).forEach(function(n) {
        if(g.stats[n] === undefined) {
            g.stats[n] = 1;
            g.keys.push(n);
        } else {
            g.stats[n] += 1;
        }
    });
};
*/

Ngrams.prototype.update = function(key, count) {
    //console.log(key);
    var g = this;
    g._ranks = undefined;
    if (g.stats[key] === undefined) {
        g.stats[key] = count;
        g.keys.push(key);
    } else {
        g.stats[key] += count;
    }
    if (g.chartSize == 0) // no charting; just break out
        return this;
    if (g.chart.length < g.chartSize  && g.chart.indexOf(key) == -1) { // chart not full yet!
        g.chart.push(key);
    } else if ( g.stats[key] > g.stats[g.chart.last()] && g.chart.indexOf(key) == -1 ) { // new ngram!
        g.chart[g.chartSize-1] = key;
    }
    g.chart.sort(function(a,b) {      // keep sorting
        return g.stats[a] < g.stats[b];
    });
    g.onChartUpdate(g.chart); // callback
    return this;
}
    
Ngrams.prototype.push = function(atom) {
    if (this._last.length >= this.max) // buffer full; dequeue
        this._last.shift();
    this._last.push(atom); // push new item
    var g = this;
    var len = this._last.length;
    for (var i = 0; i < len; i++) {  // loop over the initial item of the ngram
        var ngram = [];
        for (var j = i; j < len; j++) { // loop over the elements of the ngram
            // Change g._last[j][0] to 0 to get absolute ngrams
            var offset = (j == i) ? g._last[j][0] : g._last[j-1].last(); // last chord value, for taking differences. 
            var chord = g._last[j].diff(offset);
            ngram.push(chord);
        }
        //console.log(JSON.stringify(ngram));
        if (ngram.length >= g.min)
            g.update(ngram.map(function(e){return e.join('_');}).join('+'),1); // register only if it's long enough
    }
    return this;
}

/**
 * build ngrams from a sentences, an array of words
 */
    /*
Ngrams.prototype.feedAll = function(words) {
    if(typeof words === 'string')
        words = words.tokens();
    var g = this;
    words.forEach(function(word) {
        g.feed(word);
    });
};
*/
    
Ngrams.prototype.flush = function() {
    this.keys = [];
    this.stats = {};
    this.chart = [];
    this._last = [];
    return this;
}

/**
 * Sort all ngrams by popularity
 */
Ngrams.prototype.ranks = function() {
    if(this._ranks === undefined) {
        var g = this;
        this.keys.sort(function(a,b) {
            return g.stats[a] - g.stats[b];
        });
        var rank = 0;
        var ranks = {};
        var before = undefined;
        this.keys.reverse().forEach(function(key) {
            if(g.stats[key] != before) {
                before = g.stats[key];
                rank += 1;
            }
            ranks[key] = rank;
        });
        this._ranks = ranks;
    }
    return this._ranks;
};

/**
 * Feed Ngrams from a lm file
 */
/*
Ngrams.prototype.readLm = function(path) {
    var lm = fs.readFileSync(path,'utf8');
    var n = this;
    lm.split('\n').forEach(function(line) {
        var kv = line.split('\t ');
        //console.log(kv[0].length);
        if(kv.length > 1 && kv[0].length >= n.min && kv[0].length <= n.max) {
            n.keys.push(kv[0]);
            n.stats[kv[0]] = parseInt(kv[1],10);
        }
    });
};
*/

/**
 * Distance between two Ngrams
 */
Ngrams.prototype.distance = function(other) {
    var distance = 0;
    var n = this;
    this.keys.forEach(function(key) {
        if(other.stats[key] === undefined) {
            distance += 2000;
        } else {
            distance += Math.abs(n.ranks()[key] - other.ranks()[key]);
        }
    });
    return distance;
};

//global.ngram = ngram;
global.Ngrams = Ngrams;

})(this);