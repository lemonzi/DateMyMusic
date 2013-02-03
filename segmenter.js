// Music model
// Given a note onsets and offsets stream, how can we separate notes and chords?
// It triggers callbacks when chords are detected

(function(global){
    
    var Segmenter = function () {
        this.notes = 0;
        this.chord = {};
        
        // Callbacks
        this.onNewChord = function(chord) {};
    };
    
    Segmenter.prototype.noteOn = function(note) {
        this.chord[note] = true;    
        this.notes = this.notes + 1;
    };
    
    Segmenter.prototype.noteOff = function(note) {
        this.notes = Math.max(this.notes - 1, 0);
        if (this.notes == 0) {
            var chord = Object.keys(this.chord).sort();
            this.onNewChord(chord);
            this.chord = {};
        }
    };

    global.Segmenter = Segmenter;
    
})(this);