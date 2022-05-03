# transRedBatch
Batch Translation assist for Translator++.

This tool is based on the general translation guide, [which can be found here](TranslationGuide.MD). There is also a very short Cheat Sheet that is a condensed reference to the guide, [the cheatsheet can be found here](CheatSheet.MD).

## What does the Addon do?

The addon was initially created as a replacement for T++'s default Batch Translation. The default Batch translator is somewhat slow due to how the text is added back into the project.

This addon solves that speed issue (which is notable on bigger projects) by caching the position of every line being translated - so there is no search to put them back in.

![The batch translation window](/guide/batchTranslator.png)

The addon also has some helper functions to help in the process of batch machine translating projects. The buttons are added to T++ in a red color, and can be found at the top:

![The addon's buttons](/guide/batchButtons.png)

## Every function

+ ![Prepare](/guide/button1Prepare.png) - The first button is the "Prepare Project for Batch Translation". This button only works for RPG Maker projects, what it does is follow the guide above and apply tags.
    + Safe to translate contexts will be kept without any marks. Contexts which are known to be translatable, but might cause problems will be tagged Yellow. Contexts which are unlikely to be translatable will be tagged Red. Additionally, contexts which are known to not be visible will be removed from the project entirely (these are event names, animation names, etc, text that exists but is never seen in-game).
+ ![Translate](/guide/button2Translate.png) - The second button opens the batch translation window above.
+ ![Wrap](/guide/button3Wrap.png) - The third button will word wrap the text inside the project following configurable rules from the addon's option window.
    + This word wrapping is very different to the default word wrapping. Instead of measuring character count, we measure character width. This means that the length settings should be set in full-width characters. For instance, RPG Maker MV games default to showing up to 28 japanese full-width characters per line. So that's the default setting this addon has.

Examples for text width:

+ 平仮名ひらがな片仮名カタカナ
    + 14 characters
+ 0123456789012345678901234
    + 24 characters (but occupy slightly less space)
+ Abcde fghi. Jklmn opqrs?
    + 24 characters, but even shorter.

Calculating how much width each sentence has is far too expensive (computationally), so instead we approximate that by counting how much width each character has (which is close enough of an approximation). This allows us to wrap sentences much closer to the edges of message boxes/etc.

The way the wrapping is performed can also be found in T++'s options panel.