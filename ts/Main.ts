/// <reference path="RedBatchTranslator.ts" />
/// <reference path="RedButtonManager.ts" />

const wordWrapNoPicture = "60";
const wordWrapPicture = "50";

var thisAddon = <any> this;

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
        // Word Wrap common messages
        trans.wordWrapFiles(
            trans.getAllFiles(), // Files
            1, // Source
            2, // Destination
            {
                maxLength: wordWrapNoPicture,
                context: [
                    "dialogue", "message1", "message2", "message3",
                    "description", "message", "noPicture", "scrollingMessage"
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
                    "hasPicture", "Dialogue",
                ]
            }
        );

        trans.refreshGrid();
	});

    let $buttonContainer = $(buttonContainer);
	$buttonContainer.prepend(wrapButton.getButton());
	$buttonContainer.prepend(translateButton.getButton());
	$buttonContainer.prepend(prepareButton.getButton());
});