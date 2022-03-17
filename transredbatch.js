"use strict";
class RedBatchTranslatorButton {
}
class RedBatchTranslatorWindow {
    constructor(parent) {
        this.$monster = $(`<div class='ui-widget-overlay ui-front' style='opacity: 1; background-color: rgba(170, 170, 170, 0.3); display: flex; justify-content: center; align-items: center;'><div style='background-color: white; width: 600px; height: 500px; font-size: 1.2ex; position: relative;'><div style='background-color: black; color: white; line-height: 30px; padding-left: 10px;'><h1 style='margin:0px'>Red Batch Translation</h1></div><div style='padding: 10px;'><h2 style='margin: 0px;'>Select Translator<select id='redBatchTranslatorSelect' style='margin-left: 2ex'></select></h2><hr><div class='flex col-2'><div class='fieldmember sourceCol'><h2 style='margin:0px'>Source column</h2><label class='columnSelector'><select id='redBatchTranslatorSourceSelect'></select></label><div class='smallInfo'>Which column is the source text to translate for?<br>(default is key column / leftmost column).</div></div><div class='fieldmember'><h2 style='margin:0px'>Target column</h2><label class='targetCol'><select id='redBatchTranslatorDestinationSelect'></select></label><div class='smallInfo'>Which column is the translated text put into.<br>(Can not same with source column)</div></div></div><hr><h2 style='margin: 0px; margin-bottom: 1ex;'>Options</h2><label class='flex fullWidth bottomSpace'><div class='flexMain'><h3 class='label' style='margin: 0px;'>Save on each Batch</h3><div class='info'>If checked, the project is saved after every batch translation.</div></div><div><input checked='true' class='flipSwitch translateOther' id='redBatchTranslatorSave' type='checkbox' value='1'></div></label><label class='flex fullWidth bottomSpace'><div class='flexMain'><h3 class='label' style='margin: 0px;'>Ignore translated</h3><div class='info'>If checked, rows with translations will not be translated.</div></div><div><input checked='true' class='flipSwitch translateOther' id='redBatchTranslatorIgnore' type='checkbox' value='1'></div></label><label class='flex fullWidth bottomSpace'><div class='flexMain'><h3 class='label' style='margin: 0px;'>Strict Whitelist</h3><div class='info'>If checked, rows with no tags can fail the whitelist.</div></div><div><input class='flipSwitch translateOther' id='redBatchTranslatorStrict' type='checkbox' value='1'></div></label><hr><div class='options fieldgroup' id='redBatchTranslatorBlacklist'><div class='fieldmember'><h2 style='margin: 0px;'>Blacklist</h2><div class='info'>Rows that have any of the selected tags will not be translated</div><div class='colorTagSelector'><div class='uiTags uiTagsWrapper rendered' data-mark='unknown'><input checked='true' class='colorTagSelector tagSelector red' name='tagSelector' style='background-color: rgb(255, 0, 0);' title='red' type='checkbox' value='red'><input class='colorTagSelector tagSelector yellow' name='tagSelector' style='background-color: rgb(255, 255, 0);' title='yellow' type='checkbox' value='yellow'><input class='colorTagSelector tagSelector green' name='tagSelector' style='background-color: rgb(0, 128, 0);' title='green' type='checkbox' value='green'><input class='colorTagSelector tagSelector blue' name='tagSelector' style='background-color: rgb(0, 0, 255);' title='blue' type='checkbox' value='blue'><input class='colorTagSelector tagSelector gold' name='tagSelector' style='background-color: rgb(212, 175, 55);' title='gold' type='checkbox' value='gold'><input class='colorTagSelector tagSelector purple' name='tagSelector' style='background-color: rgb(128, 0, 128);' title='purple' type='checkbox' value='purple'><input class='colorTagSelector tagSelector black' name='tagSelector' style='background-color: rgb(0, 0, 0);' title='black' type='checkbox' value='black'><input class='colorTagSelector tagSelector gray' name='tagSelector' style='background-color: rgb(128, 128, 128);' title='gray' type='checkbox' value='gray'><input class='colorTagSelector tagSelector white' name='tagSelector' style='background-color: rgb(255, 255, 255);' title='white' type='checkbox' value='white'><input class='colorTagSelector tagSelector silver' name='tagSelector' style='background-color: rgb(192, 192, 192);' title='silver' type='checkbox' value='silver'><input class='colorTagSelector tagSelector pink' name='tagSelector' style='background-color: rgb(255, 192, 203);' title='pink' type='checkbox' value='pink'><input class='colorTagSelector tagSelector indigo' name='tagSelector' style='background-color: rgb(75, 0, 130);' title='indigo' type='checkbox' value='indigo'><input class='colorTagSelector tagSelector aqua' name='tagSelector' style='background-color: rgb(0, 255, 255);' title='aqua' type='checkbox' value='aqua'><input class='colorTagSelector tagSelector tan' name='tagSelector' style='background-color: rgb(210, 180, 140);' title='tan' type='checkbox' value='tan'><input class='colorTagSelector tagSelector darkred' name='tagSelector' style='background-color: rgb(139, 0, 0);' title='darkred' type='checkbox' value='darkred'></div></div></div></div><hr><div class='options fieldgroup' id='redBatchTranslatorWhitelist'><div class='fieldmember'><h2 style='margin: 0px;'>Whitelist</h2><div class='info'>If any of the following colors is selected, only rows with that color will be translated. This overrides the Blacklist.</div><div class='colorTagSelector'><div class='uiTags uiTagsWrapper rendered' data-mark='unknown'><input class='colorTagSelector tagSelector red' name='tagSelector' style='background-color: rgb(255, 0, 0);' title='red' type='checkbox' value='red'><input class='colorTagSelector tagSelector yellow' name='tagSelector' style='background-color: rgb(255, 255, 0);' title='yellow' type='checkbox' value='yellow'><input class='colorTagSelector tagSelector green' name='tagSelector' style='background-color: rgb(0, 128, 0);' title='green' type='checkbox' value='green'><input class='colorTagSelector tagSelector blue' name='tagSelector' style='background-color: rgb(0, 0, 255);' title='blue' type='checkbox' value='blue'><input class='colorTagSelector tagSelector gold' name='tagSelector' style='background-color: rgb(212, 175, 55);' title='gold' type='checkbox' value='gold'><input class='colorTagSelector tagSelector purple' name='tagSelector' style='background-color: rgb(128, 0, 128);' title='purple' type='checkbox' value='purple'><input class='colorTagSelector tagSelector black' name='tagSelector' style='background-color: rgb(0, 0, 0);' title='black' type='checkbox' value='black'><input class='colorTagSelector tagSelector gray' name='tagSelector' style='background-color: rgb(128, 128, 128);' title='gray' type='checkbox' value='gray'><input class='colorTagSelector tagSelector white' name='tagSelector' style='background-color: rgb(255, 255, 255);' title='white' type='checkbox' value='white'><input class='colorTagSelector tagSelector silver' name='tagSelector' style='background-color: rgb(192, 192, 192);' title='silver' type='checkbox' value='silver'><input class='colorTagSelector tagSelector pink' name='tagSelector' style='background-color: rgb(255, 192, 203);' title='pink' type='checkbox' value='pink'><input class='colorTagSelector tagSelector indigo' name='tagSelector' style='background-color: rgb(75, 0, 130);' title='indigo' type='checkbox' value='indigo'><input class='colorTagSelector tagSelector aqua' name='tagSelector' style='background-color: rgb(0, 255, 255);' title='aqua' type='checkbox' value='aqua'><input class='colorTagSelector tagSelector tan' name='tagSelector' style='background-color: rgb(210, 180, 140);' title='tan' type='checkbox' value='tan'><input class='colorTagSelector tagSelector darkred' name='tagSelector' style='background-color: rgb(139, 0, 0);' title='darkred' type='checkbox' value='darkred'></div></div></div></div></div><div class='ui-dialog-buttonset' style='text-align: right; position: absolute; bottom: 4px; right: 4px;'><button class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only' icon='ui-icon-close' id='redBatchTranslatorClose' role='button' type='button'><span class='ui-button-text'>Cancel</span></button><button class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only' icon='ui-icon-plus' id='redBatchTranslatorTranslate' role='button' type='button'><span class='ui-button-text'>Translate Now</span></button></div></div></div>`);
        this.parent = parent;
        this.monster = this.$monster[0];
        // Search the monster for our elements
        this.selectTrans = this.$monster.find("#redBatchTranslatorSelect")[0];
        this.selectSource = this.$monster.find("#redBatchTranslatorSourceSelect")[0];
        this.selectDestination = this.$monster.find("#redBatchTranslatorDestinationSelect")[0];
        this.checkSave = this.$monster.find("#redBatchTranslatorSave")[0];
        this.checkIgnore = this.$monster.find("#redBatchTranslatorIgnore")[0];
        this.checkStrict = this.$monster.find("#redBatchTranslatorStrict")[0];
        this.blacklistContainer = this.$monster.find("#redBatchTranslatorBlacklist")[0];
        this.whitelistContainer = this.$monster.find("#redBatchTranslatorWhitelist")[0];
        // Buttons
        this.$monster.find("#redBatchTranslatorClose")[0].addEventListener("click", () => {
            this.close();
        });
        this.$monster.find("#redBatchTranslatorTranslate")[0].addEventListener("click", () => {
            this.close();
            this.translate();
        });
    }
    open() {
        this.updateColumns();
        this.updateTranslatorsSelect();
        // Show
        document.body.appendChild(this.monster);
    }
    translate() {
        // Do we have some files or not?
        let files = trans.getCheckedFiles();
        if (files.length == 0) {
            files = trans.getAllFiles();
        }
        let options = {
            translator: this.selectTrans.value,
            source: parseInt(this.selectSource.value),
            destination: parseInt(this.selectDestination.value),
            ignoreTranslated: this.checkIgnore.checked,
            strict: this.checkStrict.checked,
            saveOnEachBatch: this.checkSave.checked,
            blacklist: this.getTags(this.blacklistContainer),
            whitelist: this.getTags(this.whitelistContainer),
            files: files
        };
        this.parent.translateProject(options);
    }
    getTags(container) {
        let tags = [];
        let elements = container.getElementsByClassName("tagSelector");
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            if (element.checked) {
                tags.push(element.title);
            }
        }
        return tags;
    }
    close() {
        document.body.removeChild(this.monster);
    }
    updateColumns() {
        let oldSource = this.selectSource.value != "" ? this.selectSource.value : "0";
        let oldDestination = this.selectDestination.value != "" ? this.selectDestination.value : "1";
        // Remove old
        while (this.selectSource.firstChild) {
            this.selectSource.removeChild(this.selectSource.firstChild);
        }
        while (this.selectDestination.firstChild) {
            this.selectDestination.removeChild(this.selectDestination.firstChild);
        }
        // Array of names = trans.colHeaders
        for (let i = 0; i < trans.colHeaders.length; i++) {
            this.selectSource.appendChild($(`<option value="${i}">${trans.colHeaders[i]}</option>`)[0]);
            if (i > 0) {
                this.selectDestination.appendChild($(`<option value="${i}">${trans.colHeaders[i]}</option>`)[0]);
            }
        }
        this.selectSource.value = oldSource;
        this.selectDestination.value = oldDestination;
        document.addEventListener("keydown", (ev) => {
            if (this.monster.parentNode == document.body && ev.key == "Escape") {
                ev.preventDefault();
                this.parent.close();
            }
        });
    }
    updateTranslatorsSelect() {
        let oldTrans = this.selectTrans.value == "" ? trans.project.options.translator : this.selectTrans.value;
        // Remove old
        while (this.selectTrans.firstChild) {
            this.selectTrans.removeChild(this.selectTrans.firstChild);
        }
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
            this.selectTrans.appendChild(option);
        });
        this.selectTrans.value = oldTrans;
    }
}
class RedBatchTranslatorRow {
    constructor(file, index) {
        this.location = [file, index];
    }
    getValue(source) {
        return trans.project.files[this.location[0]].data[this.location[1]][source];
    }
    isEmpty(source) {
        let value = this.getValue(source);
        return value == undefined || value == null || value == "";
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
class RedPerformance {
    constructor() {
        this.perfStart = Date.now();
        this.perfEnd = 0;
    }
    end() {
        this.perfEnd = Date.now();
    }
    getSeconds() {
        let timeTaken = this.perfEnd - this.perfStart;
        return (Math.round(timeTaken / 100) / 10);
    }
}
/// <reference path="RedBatchTranslator/RedBatchTranslatorButton.ts" />
/// <reference path="RedBatchTranslator/RedBatchTranslatorWindow.ts" />
/// <reference path="RedBatchTranslator/RedBatchTranslatorRow.ts" />
/// <reference path="RedPerformance.ts" />
class RedBatchTranslator {
    constructor() {
        this.saving = false;
        this.saveAgain = false;
        this.window = new RedBatchTranslatorWindow(this);
    }
    open() {
        this.window.open();
    }
    close() {
        this.window.close();
    }
    refresh() {
        trans.refreshGrid();
        trans.evalTranslationProgress();
    }
    translateProject(options) {
        let aborted = false;
        ui.showLoading({ buttons: [
                {
                    text: "Abort",
                    onClick: () => {
                        if (confirm(t("Are you sure you want to abort?"))) {
                            aborted = true; // :/
                            trans.abortTranslation();
                        }
                    }
                },
                { text: "Pause",
                    onClick: () => {
                        alert(t("Process paused!\nPress OK to continue!"));
                    }
                },
            ] });
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
                if (row.isEmpty(options.source)) {
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
            let text = rows[i].getValue(options.source);
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
            let alwaysSafeguard = undefined; // Stupid nodejs Timeout type
            let always = () => {
                if (alwaysSafeguard != undefined) {
                    clearTimeout(alwaysSafeguard);
                    alwaysSafeguard = undefined;
                }
                let proceed = () => {
                    if (batchIndex >= batches.length) {
                        let batchEnd = Date.now();
                        ui.log(`[RedBatchTranslator] Finished translation at ${new Date()}`);
                        ui.log(`[RedBatchTranslator] Took ${Math.round(10 * (batchEnd - batchStart) / 1000) / 10} seconds.`);
                        ui.loadingProgress(100, "Finished!");
                        ui.showCloseButton();
                        this.refresh();
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
                if (aborted) {
                    ui.log(`[RedBatchTranslator] Translation aborted.`);
                    ui.showCloseButton();
                    this.refresh();
                }
                else {
                    if (options.saveOnEachBatch) {
                        ui.log(`[RedBatchTranslator] Saving project...`);
                        this.saveProject();
                        proceed();
                    }
                    else {
                        proceed();
                    }
                }
            };
            if (batches[myBatch] == undefined) {
                always();
            }
            else {
                translatorEngine.translate(batches[myBatch], {
                    onError: () => {
                        ui.error("[RedBatchTranslator] Failed to translate batch!");
                        alwaysSafeguard = setTimeout(always, 500);
                    },
                    onAfterLoading: (result) => {
                        ui.log(`[RedBatchTranslator] Inserting into tables...`);
                        for (let i = 0; i < result.translation.length; i++) {
                            batchesRows[myBatch][i].setValue(result.translation[i], options.destination);
                        }
                        ui.loadingProgress(100 * (batchIndex + 1) / batches.length);
                        alwaysSafeguard = setTimeout(always, 500);
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
    saveProject() {
        if (this.saving) {
            this.saveAgain = true;
        }
        else {
            this.saving = true;
            trans.save().finally(() => {
                this.saving = false;
                if (this.saveAgain) {
                    this.saveAgain = false;
                    this.saveProject();
                }
            });
        }
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
