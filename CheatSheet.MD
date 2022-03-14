# Red's cheat sheet for batch translation:
1. Remove all untranslatable contexts. The following contexts **never** need to be translated, remember to tick "Match all words!":

        animations
        events name
        commonevents name
        tilesets name
        state name
        states name

2. Check whether "Note" is translatable or not. If it isn't, mark them red or delete rows. You can find them through the Search tool (Control + F), selecting "Context" in the dropdown.
![Find](/guide/NoteFind.png)
3. Do the same for PluginCommand and Control Variables. You only want to translate these if the game is clearly using them for text, otherwise, leave them be.
4. If translating Scripts/Plugins, manually check each file under them to see if they are translatable. 90% of the case they wil not be, but it's important to identify the cases where they are.
5. On MV/MZ, plugins.js usually brings a lot of text which will be used in the new menus. It is necessary to check these manually, as not all of them can be translated. A good rule of thumb is "if it has english, it's not translatable", as most script calls here will use english characters. Also need to be careful for file calls (Image.png, Folder/to/Image, etc). This requires a lot of manual attention, but remember there is a limited amount of files!
6. Translate Vocab, System, Skills, and States with "Cut Corners" OFF.
7. Translate all non-script with "Cut Corners" ON.