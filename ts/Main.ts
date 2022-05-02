/// <reference path="RedBatchTranslator.ts" />
/// <reference path="RedButtonManager.ts" />

var thisAddon = <any> this;

enum thisAddonOptions {
    alwaysMerge = "alwaysMerge",
    fontFamily = "fontFamily",
    longContexts = "longContexts",
    shortContexts = "shortContexts",
    mergeContexts = "mergeContexts",
    longLength = "longLength",
    shortLength = "shortLength"
}

thisAddon.optionsForm = {
    [thisAddonOptions.fontFamily] : {
        "type": "string",
        "title": "Font Family",
        "description": "When wrapping texts, this is the font which will be used to decide length. Ideally, use one that looks as similar as possible to the game's.",
        "default" : "Arial",
        "HOOK": "thisAddon.config." + thisAddonOptions.fontFamily
      },
    [thisAddonOptions.mergeContexts] : {
        "type": "string",
        "title": "Merge Wrap Contexts",
        "description": "Instead of breaking lines into smaller lines, the remainder of one line will be added to the start of the next line (after padding) in these contexts. This should result in less overall lines, which is good when you don't have the benefit of just making a second message.",
        "HOOK": "thisAddon.config." + thisAddonOptions.mergeContexts,
        "default" : [
            "description"
        ].join(",")
    },
    [thisAddonOptions.alwaysMerge] : {
        "type": "boolean",
        "title": "Always Merge",
        "description": `Applies the processing of merging with the next line on every wrappable context, for those who like compact text.`,
        "default" : false,
        "HOOK": "thisAddon.config." + thisAddonOptions.alwaysMerge
      },
    [thisAddonOptions.shortContexts] : {
        "type": "string",
        "title": "Short Contexts",
        "description": "These contexts will wrap to the short length type. These should be used when showing pictures, or when the game simply has a smaller message box.",
        "default" : [
            "hasPicture", //"Dialogue", // Why a uppercase DIalogue? I don't remember! Need to find out if this is correct.
        ].join(","),
        "HOOK": "thisAddon.config." + thisAddonOptions.shortContexts
      },
      [thisAddonOptions.shortLength] : {
          "type": "number",
          "title": "Short Length",
          "description": `The length to wrap short contexts to. This length is measured in square, monospace characters, using japanese characters as basis.\nWhat this means is that you are defining how long your sentences can be in amount of japanese characters. This is useful because proportional fonts will change width depending on the characters used, so wrapping to character count isn't very accurate. 24 is the number of japanese characters that fit in default MV message window with picture.`,
          "default" : 24,
          "HOOK": "thisAddon.config." + thisAddonOptions.shortLength
        },
    [thisAddonOptions.longContexts] : {
        "type": "string",
        "title": "Long Wrap Contexts",
        "description": "These contexts will wrap to the long length. So ideally these are the full screen contexts.",
        "HOOK": "thisAddon.config." + thisAddonOptions.longContexts,
        "default" : [
            "dialogue", "message1", "message2", "message3", "description",
            "message", "noPicture", "scrollingMessage"
        ].join(",")
    },
    [thisAddonOptions.longLength] : {
        "type": "number",
        "title": "Long Length",
        "description": `The length to wrap long contexts to. This length is measured in square, monospace characters, using japanese characters as basis.\nWhat this means is that you are defining how long your sentences can be in amount of japanese characters. This is useful because proportional fonts will change width depending on the characters used, so wrapping to character count isn't very accurate. 28 is the number of japanese characters that fit in default MV message window without picture.`,
        "default" : 28,
        "HOOK": "thisAddon.config." + thisAddonOptions.longLength
      },
};

thisAddon.config = thisAddon.config == undefined ? {} : thisAddon.config;;

for (let id in thisAddon.optionsForm) {
    if (typeof thisAddon.config[id] != typeof thisAddon.optionsForm[id].default) {
        if (typeof thisAddon.config[id] == "string" && typeof thisAddon.optionsForm[id].default == "number") {
            thisAddon.config[id] = parseInt(thisAddon.config[id]);
        } else {
            thisAddon.setConfig(id, thisAddon.optionsForm[id].default);
        }
    }
}

function cleanContexts (str : string) {
    str = str.replaceAll(/[,\.;\-]/g, ",").replaceAll(/ /g, "").toLowerCase();
    return str.split(",");
}

const measurer : HTMLSpanElement = document.createElement("pre");
measurer.style.fontSize = "24px";
measurer.style.fontFamily = "Arial";
measurer.style.setProperty("all", "revert", "important");
measurer.style.setProperty("position", "position", "important");
measurer.style.setProperty("visibility", "hidden", "important");
measurer.style.setProperty("width", "max-content", "important");

function measureTextPxWidth(text : string) {
    measurer.innerText = text;
    document.body.appendChild(measurer);
    let width = measurer.getBoundingClientRect().width;
    document.body.removeChild(measurer);
    console.log(`Width of text "${text}" is ${width}`);
    return width;
}



let japaneseLength = measureTextPxWidth("。");
let wordWrapNoPicture = 28 * japaneseLength; // MV Size is 28 characters, have to check against the others. 
let wordWrapPicture = 24 * japaneseLength;

function updateValues () {
    if (measurer.style.fontFamily != thisAddon.config[thisAddonOptions.fontFamily]) {
        measurer.style.fontFamily = thisAddon.config[thisAddonOptions.fontFamily];
        sizes = {};
    }
    japaneseLength = measureTextPxWidth("。");
    wordWrapNoPicture = parseInt(thisAddon.config[thisAddonOptions.longLength]) * japaneseLength;
    wordWrapNoPicture = parseInt(thisAddon.config[thisAddonOptions.shortLength]) * japaneseLength;
}


function getPadAtLine (line : string) : string {
    if (line === undefined) {
        return "";
    }
    let match = line.match(/^\s+/);
    if (match !== null) {
        return match[0];
    } else {
        return "";
    }
}

/* function equatePad (origin : string, translation : string) {
    let splitTranslation = translation.split(/\r?\n/g);
    let splitOrigin = origin.split(/\r?\n/g);

    for (let line = 0; line < splitTranslation.length; line++) {
        splitTranslation[line] = getPadAtLine(splitOrigin, line) + splitTranslation[line].trim();
    }

    return splitTranslation.join("\n");
} */

let sizes : {[id : string] : number} = {};

function getSize (text : string) {
    if (sizes[text] == undefined) {
        sizes[text] = measureTextPxWidth(text);
    }
    return sizes[text];
}

function isTrue (value : any) {
    return (value === "1" || value === "true" || value === 1 || value === true);
}

function wrapTo (text : string, length: number, mergeWithNext : boolean) {
    let lines = text.split(/\r?\n/g);
    let newLines = [];
    for (let i = 0; i < lines.length; i++) {
        let currentSize = 0;
        let originalPad = getPadAtLine(lines[i]);
        let nextPad = getPadAtLine(lines[i + 1]);
        if (nextPad.length < originalPad.length) {
            nextPad = originalPad;
        }
        let padSize = getSize(nextPad);
        if (padSize >= length/2) {
            // the pad is too large for us to work with
            nextPad = "  ";
        }
        let charAt : number;
        for (charAt = 0; charAt < lines[i].length; charAt++) {
            currentSize += getSize(lines[i].charAt(charAt));
            if (currentSize > length) {
                break;
            }
        }
        
        if (currentSize > length) {
            let closestSpace = lines[i].lastIndexOf(" ", charAt);
            if (closestSpace <= originalPad.length) {
                // Just one bigassword? Fine, suit yourself.
                closestSpace = charAt;
            }
            newLines.push(lines[i].substring(0, closestSpace));
            if (charAt < lines[i].length) {
                if (mergeWithNext || isTrue(thisAddon.config[thisAddonOptions.alwaysMerge])) {
                    if (lines[i + 1] === undefined) {
                        lines[i + 1] = "";
                    }
                    lines[i + 1] = nextPad + lines[i].substring(closestSpace).trim() + " " + lines[i + 1].trim();
                } else {
                    lines[i] = nextPad + lines[i--].substring(closestSpace).trim();
                }
            }
        } else {
            newLines.push(lines[i]);
        }
    }
    return newLines.join("\n");
}

$(document).ready(() => {
    trans.RedBatchTranslatorInstance = new RedBatchTranslator();

    let buttonContainer = document.body.getElementsByClassName("toolbar-content toolbar10 redToolbar")[0];
    if (buttonContainer == undefined) {
        let toolbarContainer = document.body.getElementsByClassName("toolbar mainToolbar")[0];
        buttonContainer = document.createElement("div");
        buttonContainer.className = "toolbar-content toolbar10 redToolbar";
        toolbarContainer.appendChild(buttonContainer);
    }

    let prepareButton = new RedButtonManagerButton("prepareProject", "icon-tasks", "Prepare Project for Batch Translation", () => {
        trans.batchCheckSheet.checkProject();
	});

	let translateButton = new RedButtonManagerButton("batchTranslate", "icon-language-1", "Batch Translate", () => {
        trans.RedBatchTranslatorInstance.open();
	});

    let wrapButton = new RedButtonManagerButton("wrapProject", "icon-commenting", "Wrap Project", () => {
        updateValues();
        let mergeable = new RegExp(`(${thisAddon.config[thisAddonOptions.mergeContexts].split(",").join(")|(")})`);
        let wrappableLong = new RegExp(`(${thisAddon.config[thisAddonOptions.longContexts].split(",").join(")|(")})`);
        let wrappableShort = new RegExp(`(${thisAddon.config[thisAddonOptions.shortContexts].split(",").join(")|(")})`);

        let files = <string[]> trans.getAllFiles();
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            console.log("Wrapping " + file + " - Progress: " + (i + 1) + "/" + files.length);
            let data = trans.project.files[file].data;
            let contexts = trans.project.files[file].context;
            for (let k = 0; k < data.length; k++) {
                let row = data[k];
                let context = contexts[k];
                // Skip empty / untranslated lines
                if (context == undefined || row == undefined || context.length == 0 || row[1] == undefined || row[1] == "") continue;
                let contextString : string = context.join().toLowerCase();
                let shouldMerge = contextString.match(mergeable) != null;
                if (contextString.match(wrappableLong) != null) {
                    trans.project.files[file].data[k][2] = wrapTo(row[1], wordWrapNoPicture, shouldMerge);
                } else if (contextString.match(wrappableShort) != null) {
                    trans.project.files[file].data[k][2] = wrapTo(row[1], wordWrapPicture, shouldMerge);
                }
            }
        }
        trans.refreshGrid();
        trans.evalTranslationProgress();
	});

    let $buttonContainer = $(buttonContainer);
	$buttonContainer.prepend(wrapButton.getButton());
	$buttonContainer.prepend(translateButton.getButton());
	$buttonContainer.prepend(prepareButton.getButton());
});