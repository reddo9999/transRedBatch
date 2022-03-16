"use strict";
class RedBatchTranslatorButton {
}
class RedBatchTranslatorWindow {
    constructor(parent) {
        this.container = document.createElement("div");
        this.parent = parent;
        this.container.classList.add("ui-widget-overlay", "ui-front");
        this.container.style.opacity = "1";
        this.container.style.backgroundColor = "rgba(170, 170, 170, .3)";
        this.container.style.display = "flex";
        this.container.style.justifyContent = "center";
        this.container.style.alignItems = "center";
        document.addEventListener("keydown", (ev) => {
            if (this.container.parentNode == document.body && ev.key == "Escape") {
                this.parent.close();
            }
        });
        let innerWindow = document.createElement("div");
        innerWindow.style.backgroundColor = "white";
        innerWindow.style.width = "600px";
        innerWindow.style.height = "500px";
        innerWindow.style.fontSize = "1.2ex";
        this.container.appendChild(innerWindow);
        let header = document.createElement("div");
        header.style.backgroundColor = "black";
        header.style.color = "white";
        header.style.lineHeight = "30px";
        header.style.paddingLeft = "10px";
        header.innerHTML = "<h1 style='margin:0px'>Red Batch Translation</h1>";
        innerWindow.appendChild(header);
        let contents = document.createElement("div");
        contents.style.padding = "10px";
        innerWindow.appendChild(contents);
        contents.appendChild($("<h2 style='margin: 0px;'>Select Translator</h2>")[0]);
        contents.appendChild($("<hr></hr>")[0]);
        this.transSelect = this.getTranslatorsSelect();
        contents.appendChild(this.transSelect);
    }
    open() {
        document.body.appendChild(this.container);
        let updateTransSelect = this.getTranslatorsSelect();
        this.transSelect.parentElement.replaceChild(this.transSelect, updateTransSelect);
        this.transSelect = updateTransSelect;
    }
    close() {
        document.body.removeChild(this.container);
    }
    getTranslatorsSelect() {
        let transSelect = document.createElement("select");
        let transOptions = [];
        for (let i = 0; i < trans.translator.length; i++) {
            let id = trans.translator[i];
            let name = trans[id].name;
            let option = document.createElement("option");
            option.value = id;
            option.appendChild(document.createTextNode(name));
            transOptions.push(option);
        }
        transOptions.sort((a, b) => {
            let na = a.childNodes[0].nodeValue;
            let nb = b.childNodes[0].nodeValue;
            if (na < nb)
                return 1;
            else if (na > nb)
                return -1;
            return 0;
        });
        transOptions.forEach((option) => {
            transSelect.appendChild(option);
        });
        return transSelect;
    }
}
class RedBatchTranslatorRow {
    constructor(file, index) {
        this.location = [file, index];
    }
    getValue() {
        return trans.project.files[this.location[0]].data[this.location[1]][0];
    }
    isTranslated() {
        let cells = trans.project.files[this.location[0]].data[this.location[1]];
        let dataLength = cells.length;
        for (let i = 1; i < dataLength; i++) {
            if (cells[i] != null && cells[i] != undefined && cells[i].trim() != "") {
                return true;
            }
        }
        return false;
    }
    setValue(text, destination) {
        trans.project.files[this.location[0]].data[this.location[1]][destination] = text;
    }
    getTags() {
        // trans.project.files["data/Armors.json"].tags[i]
        let tags = trans.project.files[this.location[0]].tags[this.location[1]];
        if (tags == undefined) {
            return [];
        }
        return tags;
    }
}
/// <reference path="RedBatchTranslator/RedBatchTranslatorButton.ts" />
/// <reference path="RedBatchTranslator/RedBatchTranslatorWindow.ts" />
/// <reference path="RedBatchTranslator/RedBatchTranslatorRow.ts" />
class RedBatchTranslator {
    constructor() {
        this.window = new RedBatchTranslatorWindow(this);
    }
    open() {
        // TODO: Make options window when I feel like it
        //this.window.open();
        let files = trans.getCheckedFiles();
        if (files.length == 0) {
            files = trans.getAllFiles();
        }
        let options = {
            translator: "redsugoi",
            destination: 1,
            blacklist: ["red"],
            ignoreTranslated: true,
            whitelist: [],
            strict: false,
            saveOnEachBatch: true,
            files: files
        };
        this.translateProject(options);
    }
    close() {
        this.window.close();
    }
    translateProject(options) {
        ui.showLoading();
        ui.loadingProgress(0, "Starting up...");
        ui.log(`[RedBatchTranslator] Beginning translation at ${new Date()}`);
        let consoleWindow = $("#loadingOverlay .console")[0];
        let pre = document.createElement("pre");
        pre.style.whiteSpace = "pre-wrap";
        pre.appendChild(document.createTextNode(JSON.stringify({
            ...options,
            files: options.files.join("; ")
        }, undefined, 4)));
        consoleWindow.appendChild(pre);
        let translatorEngine = trans[options.translator];
        let rows = [];
        ui.loadingProgress(0, "Finding translatable rows");
        // Iterate through rows and add them up
        for (let i = 0; i < options.files.length; i++) {
            console.log(`[RedBatchTranslator] Working on ${options.files[i]}...`);
            let file = options.files[i];
            let data = trans.project.files[file].data;
            for (let k = 0; k < data.length; k++) {
                let row = new RedBatchTranslatorRow(file, k);
                // Repeating work?
                if (options.ignoreTranslated && row.isTranslated()) {
                    continue;
                }
                // Empty row?
                if (row.getValue() == undefined || row.getValue() == null || row.getValue().trim() == "") {
                    continue;
                }
                if (options.blacklist.length == 0 && options.whitelist.length == 0) {
                    // Everyone is allowed
                    rows.push(row);
                }
                else if (options.whitelist.length > 0) {
                    // Only if your name is on the list
                    let tags = row.getTags();
                    if (tags.length == 0) {
                        if (!options.strict) {
                            // No tags, no strict, means we allow it through
                            rows.push(row);
                        }
                    }
                    else {
                        for (let t = 0; t < tags.length; t++) {
                            if (options.whitelist.indexOf(tags[t]) != -1) {
                                rows.push(row);
                                break;
                            }
                        }
                    }
                }
                else {
                    // DISCRIMINATION ON
                    let tags = row.getTags();
                    let clear = true;
                    for (let t = 0; t < tags.length; t++) {
                        if (options.blacklist.indexOf(tags[t]) != -1) {
                            clear = false;
                            break;
                        }
                    }
                    if (clear) {
                        rows.push(row);
                    }
                }
            }
        }
        // rows = Array of rows that need translating
        let batches = [];
        let batchesRows = [];
        let maxLength = translatorEngine.maxRequestLength;
        let currentBatch = [];
        let currentBatchRows = [];
        let currentSize = 0;
        let addToBatches = () => {
            batches.push(currentBatch);
            batchesRows.push(currentBatchRows);
            currentBatchRows = [];
            currentBatch = [];
            currentSize = 0;
        };
        for (let i = 0; i < rows.length; i++) {
            let text = rows[i].getValue();
            if (currentSize > 0 && (currentSize + text.length) > maxLength) {
                addToBatches();
            }
            currentBatch.push(text);
            currentBatchRows.push(rows[i]);
            currentSize += text.length;
        }
        if (currentSize > 0) {
            addToBatches();
        }
        let batchIndex = 0;
        let batchStart = Date.now();
        let translate = () => {
            ui.loadingProgress(0, `Translating batch ${batchIndex + 1} of ${batches.length}`);
            let myBatch = batchIndex++;
            let always = () => {
                let proceed = () => {
                    if (batchIndex >= batches.length) {
                        let batchEnd = Date.now();
                        ui.log(`[RedBatchTranslator] Finished translation at ${new Date()}`);
                        ui.log(`[RedBatchTranslator] Took ${Math.round(10 * (batchEnd - batchStart) / 1000) / 10} seconds.`);
                        ui.loadingProgress(100, "Finished!");
                        ui.showCloseButton();
                        setTimeout(() => {
                            trans.refreshGrid();
                            trans.evalTranslationProgress();
                        }, 500);
                    }
                    else {
                        let batchDelay = translatorEngine.batchDelay;
                        if (batchDelay == undefined || batchDelay <= 1) {
                            translate();
                        }
                        else {
                            ui.log(`[RedBatchTranslator] Waiting ${batchDelay}ms.`);
                            setTimeout(translate, batchDelay);
                        }
                    }
                };
                if (options.saveOnEachBatch) {
                    ui.log(`[RedBatchTranslator] Saving project...`);
                    trans.save().finally(proceed);
                }
                else {
                    proceed();
                }
            };
            if (batches[myBatch] == undefined) {
                always();
            }
            else {
                translatorEngine.translate(batches[myBatch], {
                    onError: () => {
                        ui.error("[RedBatchTranslator] Failed to translate batch!");
                    },
                    onAfterLoading: (result) => {
                        ui.log(`[RedBatchTranslator] Inserting into tables...`);
                        for (let i = 0; i < result.translation.length; i++) {
                            batchesRows[myBatch][i].setValue(result.translation[i], options.destination);
                        }
                    },
                    always: always,
                    progress: (perc) => {
                        ui.loadingProgress(perc);
                    }
                });
            }
        };
        translate();
    }
}
class RedButtonManagerButton {
    constructor(name, icon, title, action) {
        this.name = name;
        this.icon = icon;
        this.title = title;
        this.action = action;
    }
    setIcon(icon) {
        this.icon = icon;
        if (this.element != undefined) {
            this.element.children[0].className = icon;
        }
    }
    getButton() {
        if (this.element != undefined) {
            return this.element;
        }
        else {
            let button = document.createElement("button");
            button.classList.add("menu-button");
            button.dataset.tranattr = "title";
            button.title = t(this.title);
            let icon = document.createElement("i");
            icon.classList.add(this.icon);
            button.appendChild(icon);
            icon.style.color = "#E00";
            button.addEventListener("click", this.action);
            this.element = button;
            return button;
        }
    }
}
/// <reference path="RedBatchTranslator.ts" />
/// <reference path="RedButtonManager.ts" />
const wordWrapNoPicture = "60";
const wordWrapPicture = "50";
var thisAddon = this;
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
        trans.wordWrapFiles(trans.getAllFiles(), // Files
        1, // Source
        2, // Destination
        {
            maxLength: wordWrapNoPicture,
            context: [
                "dialogue", "message1", "message2", "message3",
                "description", "message", "noPicture", "scrollingMessage"
            ]
        });
        // Word Wrap picture
        trans.wordWrapFiles(trans.getAllFiles(), // Files
        1, // Source
        2, // Destination
        {
            maxLength: wordWrapPicture,
            context: [
                "hasPicture"
            ]
        });
    });
    buttonContainer.appendChild(prepareButton.getButton());
    buttonContainer.appendChild(translateButton.getButton());
    buttonContainer.appendChild(wrapButton.getButton());
});
const removableContexts = [
    "animations",
    "events name",
    "commonevents name",
    "tilesets name",
    "state name",
    "states name"
];
const translatableNoteRegExp = /(<SG)|(<SAC.+?:)/gim;
const translatablePluginRegExp = /^(?:DW_(?!SET))|(?:D_TEXT )|(?:addLog )|(?:DW_)|(?:ShowInfo )/gim;
const translatablePluginJSRegExp = /[^\x21-\x7E\* ]+/g;
const translatableControlVariable = /.*/g;
class RedBatchCheatSheet {
    checkProject() {
        // Remove untranslatable rows
        trans.removeRowByContext(undefined, removableContexts, {
            matchAll: true
        });
        // Check Control Variables
        this.checkCollection(trans.travelContext(trans.getAllFiles(), "Control Variables"), translatableControlVariable);
        // Check notes
        this.checkCollection(trans.travelContext(trans.getAllFiles(), "note"), translatableNoteRegExp);
        // Check plugin command
        this.checkCollection(trans.travelContext(trans.getAllFiles(), "plugin"), translatablePluginRegExp);
        // Check plugins.js file
        this.checkFile("js/plugins.js", translatablePluginJSRegExp);
        // VX Ace inline scripts
        this.checkCollection(trans.travelContext(trans.getAllFiles(), "script/"), translatablePluginJSRegExp);
        this.checkCollection(trans.travelContext(trans.getAllFiles(), "inlinescript"), translatablePluginJSRegExp);
        // Red all js/plugins/
        for (let file in trans.project.files) {
            // VX Ace scripts (except vocab!)
            if (file.indexOf("js/plugins/") != -1 || // MV/MZ plugins
                (file.indexOf("Scripts/") != -1 && file.indexOf("Vocab") == -1) || // VX Ace scripts, except Vocab
                file.indexOf("Game.ini") != -1 // VX Ace .ini... dangerous!
            ) {
                let fileData = trans.project.files[file];
                for (let index = 0; index < fileData.data.length; index++) {
                    trans.project.files[file].tags[index] = ["red"];
                }
            }
        }
        // Update view
        trans.refreshGrid();
        trans.evalTranslationProgress();
    }
    checkCollection(collection, regExp) {
        for (let file in collection) {
            let rows = collection[file];
            for (let index = 0; index < rows.length; index++) {
                if (rows[index] === true) {
                    this.checkRow(file, index, regExp);
                }
            }
        }
    }
    checkFile(file, regExp) {
        let fileData = trans.project.files[file];
        if (fileData != undefined) {
            for (let index = 0; index < fileData.data.length; index++) {
                this.checkRow(file, index, regExp);
            }
        }
    }
    checkRow(file, index, regExp) {
        let text = trans.project.files[file].data[index][0];
        if (text != null && text != undefined) {
            let search = text.search(regExp);
            if (search != -1) {
                trans.project.files[file].tags[index] = ["yellow"];
            }
            else {
                trans.project.files[file].tags[index] = ["red"];
            }
        }
    }
}
trans.batchCheckSheet = new RedBatchCheatSheet();
