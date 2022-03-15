/// <reference path="RedBatchTranslator.ts" />

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

document.body.appendChild(div);