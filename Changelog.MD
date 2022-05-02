# Version 0.15
+ Prevent infinite loops by sacricifing padding in case it is too long
+ Add configurable options
+ Add option to try and reduce line amount in critical contexts / e.g. descriptions
    + This is because descriptions can't span into the next window if they don't fit, so we only have 4 or so lines depending on the game. If this saves us a single line that can mean the difference between the text rendering out of bounds or in.
+ God protect us from Comments

# Version 0.13
+ Recovers padding after wrapping text.
+ No longer using default Word Wrap implementation.
+ New wrap implementation counts character width rather than character count.
    + It defaults to MV character size at default font. Might need to tinker for other games/engine.

# Version 0.12
+ Fix: Correct default translator
+ Fix: It correctly loads now.


# Version 0.10
+ Fix: Translators sorted badly.
+ Fix: Grid not updated after wrapping
+ Fix: Grid not updated after aborting translations
+ Some more VX Ace on old parser support
+ Try to order the buttons
+ Removed most unnecessary performance checks.
+ Known bugs: Wrong translator selected by default.

# Version 0.09
+ Remove minimum height from the batch window.

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