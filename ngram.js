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
    if ( (g.chart.length == 0) || ( g.stats[key] > g.stats[g.chart.last()] ) ) {
        g.chart[Math.min(g.chart.length, g.chartSize-1)] = key;
        g.chart.sort(function(a,b) {
            return g.stats[a] > g.stats[b];
        });
        g.onChartUpdate(g.chart);
    }
    return this;
}
    
Ngrams.prototype.push = function(atom) {
    if (this._last.length >= this.max)
        this._last.shift();
    this._last.push(atom);
    var g = this;
    this._last.reduce(function(prev,cur) {
        var offset = prev.length > 0 ? g._last[prev.length-1].last() : 0;
        prev.push(cur.diff(offset));
        console.log(JSON.stringify(prev));
        if (prev.length >= g.min)
            g.update(prev.map(function(e){return e.join('_');}).join('+'),1);
        return prev;
    },[]);
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