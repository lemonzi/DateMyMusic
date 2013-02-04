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

All this runs in _realtime_, and it's pure client-side code!

More technical details at the [live app](http://lemonzi.github.com/DateMyMusic/about.html)

FAQ
===========
* Why do you have 2 duplicate branches?
Since all the code runs at the client, there is no need for having a server. Therefore, I'm using Github itself as the content server for the live app with Github Pages. This implies that the branch gh-pages is the production version, and I'm using the master branch for developing. 

* Some weird years keep appearing
Yes, I know. It's easy to generate uncommon chords, and the scoring system fails when the response from the database is small. Gotta fix it someday.

* I'm playing some chords from [put your favorite band here] and it tells me it's from the XVIII century. What's wrong?
That's because the Peachnote database, where the music is matched against, indexes only classical music.