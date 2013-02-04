Date My Music
Let the computer predict which year a MIDI composition you play could have ben written in: http://lemonzi.github.com/DateMyMusic
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

All this runs in _realtime_, and it's pure client-side code!

More technical details on the web.