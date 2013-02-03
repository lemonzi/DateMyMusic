Date My Music
===========

Do you like [improvisations](http://www.youtube.com/watch?v=sZSPBk_TGaI)? I once attended a concert in my conservatory by some professors. It wasn't a regular concert, because they were professors of Improvisation.
They started playing a Fugue out of a couple of notes somebody sang. Then, a Minuet followed. It was truly amazing.

Now I wonder, would it be possible to automatically extract some metadata from improvisations that could help us understand what happens there? The answer is yes.

Thanks to Peachnote's API and datasets, it is possible to query given chord sequences or melodies in a very huge dataset built by optically recognizing online, publicly availabe sheet music. From this, one can get back in which year, or in which musical works this motifs appear the most, using techniques from Natural Language Processing.

My approach is as follows:

* Take a MIDI polyphonic input from the musician
* Try to figure out what chords are being played, given a bunch of notes
* Train a lingustic model that summarizes how the musician plays in terms of chord progression and melodic turns
* Query the database and check the model against all possible matches to determine what style is the musician closest to

And all this runs in _realtime_, and it's pure client-side code!

## Technical details

### MIDI input

The MIDI data is fed to the browser through a Java applet, using a library called MidiBridge. This library fetches data from any MIDI device from the computer, so it's possible to analyze existing MIDI files by playing them back, work with MIDI keyboards or even recognize live music using an audio to MIDI converter.

### Chord segmentation

To segment chords and notes, I've decided to aggregate all notes that are pressed on the keyboard until there is none pressed, and then release all of them together. This makes sense, because it's impossible to press all notes from a chord at the very same time, and in music there are usually short empty intervals in between note or chord changes. 
Its drawback is that if the musician is playing legato it's very likely that the notes will get mixed together. 

### Model building

The model that the Peachnote database uses and that I've adopted for representing the musician style relies on N-gram statistics. It stores all combinations of successive events (notes or chords) that have been played, but instead of recording them separately -which would take an enormous amount of memory- only stores the histogram of it.
Every time a new chord comes in, the model is updated and a popularity chart is revised, which always holds the most popular sequences to avoid continuously searching the entire space.

### Corpus caching

To avoid making many queries to the API for each chord that comes in, all queried sequences are stored in a local database, even if they go out of the top chart. There is an associative list that stores a collection of N-gram statistical models, very similar to the one from the musician, indexed by the item we want to identify -in the demo, historical year-. Inside this model there is the histogram, that holds information about all sequences related to the item. A list with all indexed patterns is also maintained to know when to skip the queries.

### Scoring system

Whenever the top chart from the musician model changes, all patterns on it are matched against the models of all the available items. The metric is still to be defined.

