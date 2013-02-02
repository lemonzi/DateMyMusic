(function(global){
    
    var Segmenter = function () {
        this.notes = 0;
        this.chord = [];
        
        // Callbacks
        this.onNewChord: function(chord) {},
        this.onFlush: function() {},
    };
    
    Segmenter.prototype.noteOn = function(note) {
        this.chord.push(note);    
        this.notes = this.notes + 1;
    };
    
    Segmenter.prototype.noteOff = function(note) {
        this.notes = this.notes - 1;
        if (this.notes == 0) {
            this.onNewChord(this.chord);
            this.chord = [];
        }
    };

    global.Segmenter = Segmenter;
    
})(this);