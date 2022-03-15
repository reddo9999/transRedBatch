/// <reference path="RedBatchTranslator.ts" />

const wordWrapNoPicture = "64";
const wordWrapPicture = "50";

var thisAddon = <any> this;

$(document).ready(() => {
    trans.RedBatchTranslatorInstance = new RedBatchTranslator();
});

let div = document.createElement("div");
div.style.position = "fixed";
div.style.bottom = "150px";
div.style.right = "4px";
div.style.backgroundColor = "white";
div.style.border = "solid 1px black";
div.style.padding = "5px";

let buttonPrepare = document.createElement("a");
buttonPrepare.href = "#";
buttonPrepare.addEventListener("click", (ev) => {
    ev.preventDefault();
    trans.batchCheckSheet.checkProject();
});
buttonPrepare.appendChild(document.createTextNode("Prepare Project (RPG Maker)"));
div.appendChild(buttonPrepare);

div.appendChild(document.createElement("br"));

let buttonBatch = document.createElement("a");
buttonBatch.href = "#";
buttonBatch.addEventListener("click", (ev) => {
    ev.preventDefault();
    trans.RedBatchTranslatorInstance.open();
});
buttonBatch.appendChild(document.createTextNode("Batch Translate"));
div.appendChild(buttonBatch);

div.appendChild(document.createElement("br"));

let buttonWrap = document.createElement("a");
buttonWrap.href = "#";
buttonWrap.addEventListener("click", (ev) => {
    ev.preventDefault();
    // Word Wrap common messages
    trans.wordWrapFiles(
        trans.getAllFiles(), // Files
        1, // Source
        2, // Destination
        {
            maxLength: wordWrapNoPicture,
            context: [
                "dialogue", "message1", "message2", "message3", "description", "message", "noPicture"
            ]
        }
    );

    // Word Wrap picture
    trans.wordWrapFiles(
        trans.getAllFiles(), // Files
        1, // Source
        2, // Destination
        {
            maxLength: wordWrapPicture,
            context: [
                "hasPicture"
            ]
        }
    );
});
buttonWrap.appendChild(document.createTextNode("Batch Word Wrap (RPG Maker)"));
div.appendChild(buttonWrap);

document.body.appendChild(div);