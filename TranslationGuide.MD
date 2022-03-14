# Red's guide for people who can't translate good
###### and who wanna learn to do other stuff good too
This guide will cover the fundamentals for how most games handle their texts. In particular, we will cover:
+ What are contexts and what do they mean?
    + Are all contexts translatable?
+ What are variable/function calls and how to deal with them?
+ What are custom escapers and how to use them?
+ How to choose the right placeholder?
+ How to fix text out of bounds?
***
# What are contexts and what do they mean?
When generating the translation project, Translator++ will scour the game for any and every text. A Context is, simply put, where that text was found.

The context is a tree, meaning that it keeps going until it reaches the text itself. For instance, while handling a Map Event, we might have the following Context:

    "Map001/events/3/pages/0/list/98/message/hasPicture/bottom"

What this tells us is: the text was found on **Map001**, it is from an **event**, it is specifically from the event number **3** on this map, the text was found on an event **page**, more specifically page **0**, which is a **list**, and the text was found on the **98** entry. Afterwards, we see that this text is a **message**, it also **hasPicture** and is set to **bottom**.

What really matters here is: this is a **MESSAGE**, and it has a **PICTURE**. Messages are used for dialogue, so this is pretty much the main part of the game we want to translate. **hasPicture** also tells us that part of the window will be used on a face image - this will be important later on *How to fix text out of bounds?*.
You can check which contexts a text is from by selecting it in T++:

![The context as seen in T++](/guide/Context.png)

Because Translator++ will merge sentences that are the same, it is possible for the same Text to have more than one context tree. For instance, maybe the message repeats in other maps and events. This means you only need to translate it once and it will change in every spot.

***

# Are all contexts translatable?

The context gives us important information about where the Text was found. But not every text that is in the game needs to be or even can be translated. Examples can be found in, say, the Animations file after extracting text from any RPG Maker. You will see multiple lines with the context similar to "Animations/9/name". These names are never printed in-game, they are merely used to guide development through RPG Maker. Event Names and Common Event Names serve the same purpose: to help throughout the game's development, they are never shown to the player, so there's no point in translating these.

But there are also contexts which can be described as "dangerous to translate". These contexts are when scripts are being called in some way, and therefore it's necessary that the final translation still remains a functional script call. The following is a "Plugin Command" context from an RPG Maker MV game:

![Plugin Commands are usually best left untranslated](/guide/PluginCommand.png)

"Plugin Command" is a way to call a plugin directly from the game. Most of the time, the best way to deal with them is to simply not translate them - this is why T++ marks them with the Red flag to begin with. But on rare occasions, a game will use a plugin to print a text, and in this case we actually want to translate that.
One very common plugin for text is "D_TEXT". These messages will begin with "D_TEXT " and proceed with the message that will be printed. For example:

    D_TEXT This is a message! It will be shown in-game.

When translating these, it is important that the end result maintains the first part of the message, otherwise you'll get errors in-game:

    D_TEXT Esta é uma mensagem! Será mostrado no jogo.
    D_TEXT Dies ist eine Nachricht! Es wird im Spiel angezeigt.
    D_TEXT Це повідомлення! Це буде показано в грі.
    D_TEXT これはメッセージです！ゲーム内に表示されます。

Are all valid ways of translating the message. The following is one way of breaking it which will happen if you send the message as-is to google translator:

    D_TEXTこれはメッセージです！ゲーム内に表示されます。

And the next one is a way to break it which might happen sometimes when a translator is unable to understand the plugin command:

    文本 这是一条消息！它将在游戏中显示。

In the first one, you can see that the space between "D_TEXT" and the message got removed. This will corrupt the plugin call. On the second, the D_TEXT was entirely removed, the game will not be able to call the plugin.

To translate these messages securely, it is important to make use of custom escapers and placeholders, which we will cover later. For now, it's only important to understand that these are very dangerous to translate.

# One important mention

For RPG Maker MV and MZ, it is very common for developers to use the "Note" context to keep reminders of where they're going with the game. But some plugins will read these notes and turn them into something else. A very popular plugin allows the creation of Quest Reminders through Item Notes, which will then be shown in a Quest Log in-game.

For notes you should follow all the same care you put into Plugin Commands. Most of the time Notes which are called by plugins will look like:

    <SG Quest: Quest Name>
        <SG Description: What the quest needs>
        <SG Category:MainQuest>
    </SG Quest>

For these, it is important to keep in mind that you just want to translate what comes after the colon, as most of these can be read as:

    <Plugin call:Text>

And in some cases you might not want to translate at all, as is the case for the "Category" above - this is because Category might be used in another script, and if we only translate on one side, or if the translations don't match, we might have errors when getting in-game.

***

# What are variable/function calls and how to deal with them?

A lot of games will call variable values throughout messages, and some symbols have special meaning for the game interpreter. For instance:

![Variables are used extensively in most games](/guide/Variables.png)

    \n[1]は\v[40]のダメージを受けた！

Unless using an external plugin, RPG Maker games will call upon names and variables through \n[number] or \v[number], for Names and Variables respectively. In general, you absolutely do not want to translate these, as that will result in errors in game. Examples of bad translations:

    \nI took damage from [40]!
    0xF0000 took 0xF0001 damage!

The first one might cause an error since \nI is not a valid command, and will show [40] as a text. The second is a failed placeholder attempt which will result in the placeholder being shown in-game rather than the original values.

A good translation needs to make sure the calls are kept as-is on the final translation:

    \n[1] took \v[40] damage!

How to protect these calls will be taught in the Custom Escaper / Placeholder section. For now, it's just important that you keep in mind that even though it might be a text, and it might be a message, it might not be *all* translatable.

# What are custom escapers and how to use them?

![Behold, my stuff](/guide/CustomEscaper.png)

The Custom Escaper is T++'s solution for when you want to translate a text even though it has untranslatable elements. It allows you to strip the message from these elements and then put them back in after translating.

Each line refers to a Regular Expression, which will match text against itself, and on positive matches, the text will be replaced by a placeholder before translation, and recovered to the original value after translation.

The following are some interesting Placeholders, with comments added:

    /(<SGカテゴリ:.*>)|(<SG[^:]+>)|(<SG.+?:)|(>)|(<SAC.+?:)/g, // Covers common notes for SG Quests and SAC information.
    /^(?:DW_(?!SET))|(?:D_TEXT)|(?:addLog)|(?:DW_) /g, // Covers Plugin Command for DW_ Messages and D_TEXT messages, addLog messages, etc,
    /( *　*(?:(?:if)|(?:en))\(.+?\) *　*)+/g, // Choices in RPG Maker will sometimes be conditional, with the conditions being put inside if(conditions) or en(conditions). This makes sure both of those are left as they are.

Not all Translator Engines have support for the custom escaper, and not all that do have full support for it, so be careful about how you use them. Red Translator Engine translators have support for the custom escaper with nested patterns (patterns which generate another pattern), etc. https://regexr.com/ is a good place to test out Regular Expressions to see how they'd work.

# How to choose the right placeholder?

Placeholders are chosen by the Code Escaping Algorithm. How these are implemented varies by Translator Engine. Some (like Google) have options such as "Default", "Hex Placeholder" and "Meaningless Word". All of these will have varying degrees of sucess depending on the text being sent.

The most important thing about placeholder choice is that you want it to be something that the translator won't touch. It doesn't matter what it is, so long as it's kept as it was after the translation is over.

For Google, "Hex Placeholder" and "Supplementary Private Use Area-A Codes" (https://en.wikipedia.org/wiki/Private_Use_Areas) tend to yield good results. For Sugoi Translator, I've found MV Message With Letters (%A/%S/%V) to be the most reliable placeholder.

![I'm not addicted I can stop adding any time I want!](/guide/RedPlaceholder.png)

The Red Translator Engine also has another trick to deal with placeholders, which is the Cut Corners / Split Ends option:

![Corners are not sent at all](/guide/SplitEnds.png)

This options makes it so that any placeholders placed at the corners of a sentence are not even sent to the translator. For instance:

    \n[1]は\v[40]のダメージを受けた！
    %Aは%Bのダメージを受けた！
    %A is removed
    は%Bのダメージを受けた！ is sent to translator, returning -> I took %B damage!
    Sentence is recreated as: %AI took %B damage!
    And recovered as: \n[1]I took \v[40] damage!

As can be seen above, cutting the corners damaged the sentence. This is because the translator was not given the contextual information, since %A was a symbol that it can understand (%A is a name according to grammar, %B is a subject according to grammar, this allows good translations).

So is Cutting Corners bad? No. Take the following sentence:

    「うむむむむ……開かないっ」

The quote symbols (「 and 」) can be escaped, which would result in the following sentence:

    %Aうむむむむ……開かないっ%B

In this case, the placeholders are not part of the actual text. Not sending them to the translator will only improve the tranlation quality (and also decrease translation time). The choice for using Cut Corners is simple: are the placeholders on corners part of the sentence or not? If they're not, it's best to cut corners. If they are part of the sentence, it's best to keep them in. Either way, this will depend on what you're escaping in the first place. If you are not escaping the quotes and you're positive all your placeholders will be in the middle, you can just leave if OFF. It's also best to turn it off for messages which will have placeholders at the start (common in States/Skills/Battle Messages), as these are often actors/subjects.

# How to fix text out of bounds?

Specially when using Sugoi Translator, the text tends to go out of bounds quite often, as Sugoi Translator always returns a single line, regardless of how many lines the original text had. To fix this, we need to wrap the text:

![Menus are hard to find](/guide/MenuWrap.png)

Upon opening the Automatic Wrapper, you'll be greeted by a menu asking you to say which *contexts* need wrapping. This is important, as not all types of messages need to be wrapped, or even should be wrapped.

"Dialogue", "Message", "Description" are common ways RPG Maker shows texts in it's window. We can wrap these to around 52 characters - depending on the game and the font choice/plugins, it might have less or more space. Remember - if a message has a picture, it will have less space than normal. In these cases it'd be necessary to wrap "Message hasPicture" separatedly from the other "Message".

***

Now go and translate games good.