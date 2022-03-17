# Version 0.08
+ Gets an actual option window when using.
    + While it supports any translators, some of the non-red translators might behave erratically when called this way. It's mostly there as a "well, there it is". If not using red translator engines I'd recommend just using the default batch translator for full support.

# Version 0.07
+ Saving the project is now done asynchronously. This is a massive speed gain on small projects, but a pleasant speed gain on projects of any size.
    + This also means that there is less time wasted saving the project between batches, so uptime is higher when the bottleneck is the translation process itself.

# Version 0.06
+ Switches the awful links for toolbar buttons

# Version 0.05
+ Better word wrap defaults, might still be too big if too many big letters are used. Only japanese gets monospace, I'm afraid.
+ Now marks Game.ini as Red in VX Ace games.

# Version 0.04
+ Added basic VX Ace support for the Prepare Project. Assumes New Parser for now.
    + A little support for the old parser but no promises!
+ Added button for Word Wrap. Should work relatively well on RPG Maker games of all kinds. No promises!
    + For MV/MZ, it's still better to just leave them as-is and use a word-wrap plugin instead... if the game supports it!

# Version 0.03
+ Capable of "Preparing Project", which works through rows following the guide automatically.
    + Prepare Project, for now, only works on MV/MZ games. Games originally made with English Characters require an additional manual look at Plugins.js, if translating Scripts.
    + It is recommended to use Custom Escapers and Cut Corners if translating scripts, as script text position isn't allowed to change!
+ Added placeholder buttons
+ TODO: Add better buttons.

# Version 0.02
+ Added Changelog
+ Added Guide
+ Added Cheat Sheet
+ TODO: Add cheat sheet inside the addon.

# Version 0.01
+ "It works" the release