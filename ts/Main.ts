/// <reference path="RedBatchTranslator.ts" />
/// <reference path="RedButtonManager.ts" />

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
    console.log(text, width);
    return width;
}



const japaneseLength = measureTextPxWidth("。");
const wordWrapNoPicture = 28 * japaneseLength; // MV Size is 28 characters, have to check against the others. 
const wordWrapPicture = 24 * japaneseLength;


var thisAddon = <any> this;

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

function wrapTo (text : string, length: number) {
    let lines = text.split(/\r?\n/g);
    let newLines = [];
    for (let i = 0; i < lines.length; i++) {
        let currentSize = 0;
        let originalPad = getPadAtLine(lines[i]);
        let nextPad = getPadAtLine(lines[i + 1]);
        if (nextPad.length < originalPad.length) {
            nextPad = originalPad;
        }
        let charAt : number;
        for (charAt = 0; charAt < lines[i].length; charAt++) {
            if (sizes[lines[i].charAt(charAt)] == undefined) {
                sizes[lines[i].charAt(charAt)] = measureTextPxWidth(lines[i].charAt(charAt));
            }
            currentSize += sizes[lines[i].charAt(charAt)];
            if (currentSize > length) {
                break;
            }
        }
        
        if (currentSize > length) {
            let closestSpace = lines[i].lastIndexOf(" ", charAt);
            if (closestSpace == -1) {
                // Just one bigassword? Fine, suit yourself.
                newLines.push(lines[i].substring(0, charAt));
                lines[i] = nextPad + lines[i--].substring(charAt).trim();
            } else {
                newLines.push(lines[i].substring(0, closestSpace));
                lines[i] = nextPad + lines[i--].substring(closestSpace).trim();
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
        let wrappableLong = [
            "dialogue", "message1", "message2", "message3",
            "description", "message", "noPicture", "scrollingMessage"
        ];

        let wrappableShort = [
            "hasPicture", "Dialogue", // Why a uppercase DIalogue? I don't remember! Need to find out if this is correct.
        ];

        // Recover pad
        let files = <string[]> trans.getAllFiles();
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let data = trans.project.files[file].data;
            let contexts = trans.project.files[file].context;
            for (let k = 0; k < data.length; k++) {
                let row = data[k];
                let context = contexts[k];
                if (context == undefined || row == undefined || context.length == 0) continue;
                context = context[0]; // It's safe to assume it's the same everywhere
                let wrapped = false;
                for (let z = 0; z < wrappableShort.length; z++) {
                    if (context.indexOf(wrappableShort[z]) != -1) {
                        trans.project.files[file].data[k][2] = wrapTo(row[1], wordWrapPicture);
                        wrapped = true;
                        break;
                    }
                }
                if (!wrapped) {
                    for (let z = 0; z < wrappableLong.length; z++) {
                        if (context.indexOf(wrappableLong[z]) != -1) {
                            trans.project.files[file].data[k][2] = wrapTo(row[1], wordWrapNoPicture);
                            wrapped = true;
                            break;
                        }
                    }
                }
            }
        }

        trans.refreshGrid();
	});

    let $buttonContainer = $(buttonContainer);
	$buttonContainer.prepend(wrapButton.getButton());
	$buttonContainer.prepend(translateButton.getButton());
	$buttonContainer.prepend(prepareButton.getButton());
});