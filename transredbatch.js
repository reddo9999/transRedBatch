"use strict";
class RedBatchTranslatorButton {
    constructor(parent) {
        this.panel = document.getElementsByClassName("toolbar-content toolbar3")[0];
        this.parent = parent;
        // <button class="menu-button batch-translate" data-tranattr="title" title="Batch translation">
        //  <img src="img/translate_all.png" alt="translate">
        // </button>
        this.button = document.createElement("button");
        this.button.classList.add("menu-button", "batch-translate");
        this.button.title = "Red Batch Translation";
        this.button.style.filter = "hue-rotate(260deg)"; // Green to red
        this.button.title = "Red Batch Translation";
        let img = document.createElement("img");
        img.src = "img/translate_all.png";
        img.alt = "red batch translation";
        this.button.appendChild(img);
        this.panel.appendChild(this.button);
        this.button.addEventListener("click", () => {
            this.parent.open();
        });
    }
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
/* <div id="dialogTranslateAll" data-tranatrr="title" class="dialog dialogTranslateAll ui-dialog-content ui-widget-content initialized" style="width: auto; min-height: 0px; max-height: none; height: 285px;">
    <h2 data-tran="">Select Translator</h2>
    <div class="translatorSelection"><select class="translatorSelector"><option value="deepl">DeepL</option><option value="sugoitrans">Sugoi Translator</option><option value="papago">Papago</option><option value="redsugoi">Red Sugoi Translator</option><option value="redgoogles">Red Google Translator</option><option value="atlas">Atlas</option><option value="babylon">Babylon</option><option value="baidu">Baidu</option><option value="bing">Bing</option><option value="excite">Excite</option><option value="google">Google</option><option value="googleCloud">Google Cloud</option><option value="kakao">Kakao</option><option value="pragma6">Pragma6</option><option value="redGoogle">Red Google</option><option value="yandexpro">yandex Pro</option></select></div>
    <div class="flex col-2">
        <div class="fieldmember sourceCol">
            <h2 data-tran="">Source column</h2>
            <label class="columnSelector"><select><option value="0">Original Text</option><option value="1">Initial</option><option value="2">Machine translation</option><option value="3">Better translation</option><option value="4">Best translation</option></select></label>
            <div class="smallInfo" data-tran="">Which column is the source text to translate for?<br>(default is key column / leftmost column).</div>
        </div>
        <div class="fieldmember">
            <h2 data-tran="">Target column</h2>
            <label class="targetCol"><select><option value="1">Initial</option><option value="2">Machine translation</option><option value="3">Better translation</option><option value="4">Best translation</option></select></label>
            <div class="smallInfo" data-tran="">Which column is the translated text put into.<br>(Can not same with source column)</div>
        </div>

    </div>

    <div class="options fieldgroup">
        <h2 data-tran="">Options</h2>
        <div class="fieldmember">
            <label><input type="checkbox" name="translateOther" class="checkbox translateOther" value="1"><span data-tran="">Also try to translate other object</span></label>
            <div class="smallInfo" data-tran="">If this option is checked then Translator++ will also try to translate other objects that you did not select that doesn't require machine translation. This is the default behavior in Translator++ version 2.3.23 or lower.</div>
        </div>
        <div class="fieldmember">
            <label><input type="checkbox" name="untranslatedOnly" class="checkbox untranslatedOnly" value="1" checked="checked"><span data-tran="">Ignore if already translated</span></label>
            <div class="smallInfo" data-tran="">If this option is checked then Translator++ will ignore any row that already has translations on its column</div>
        </div>
        <div class="fieldmember">
            <label><input type="checkbox" name="overwrite" class="checkbox overwrite" value="1" checked="checked"><span data-tran="">Overwrite cells</span></label>
            <div class="smallInfo" data-tran="">Overwrite target cells. If not checked, the cells will not be touched when not empty.</div>
        </div>
        <div class="fieldmember">
            <label><input type="checkbox" name="saveOnEachBatch" class="checkbox saveOnEachBatch" value="1"><span data-tran="">Save project on each batch.</span></label>
            <div class="smallInfo" data-tran="">Save your project on each batch completion.<br>This option is to avoid data loss when the application crashes due to running heavy tasks from the local translator application. You probably don't need this if you're running cloud based translator.</div>
        </div>
        <div class="fieldmember">
            <label><input type="checkbox" name="playSoundOnComplete" class="checkbox playSoundOnComplete" value="1" checked="checked"><span data-tran="">Play sound when completed.</span></label>
        </div>
    </div>

    <div class="options fieldgroup">
        <div class="fieldmember">
            <h2 data-tran="">Tags</h2>
            <div class="colorTagSelector"><div class="uiTags uiTagsWrapper rendered" data-mark="unknown"><input type="checkbox" value="red" class="colorTagSelector tagSelector red" title="red" name="tagSelector" style="background-color: rgb(255, 0, 0);"><input type="checkbox" value="yellow" class="colorTagSelector tagSelector yellow" title="yellow" name="tagSelector" style="background-color: rgb(255, 255, 0);"><input type="checkbox" value="green" class="colorTagSelector tagSelector green" title="green" name="tagSelector" style="background-color: rgb(0, 128, 0);"><input type="checkbox" value="blue" class="colorTagSelector tagSelector blue" title="blue" name="tagSelector" style="background-color: rgb(0, 0, 255);"><input type="checkbox" value="gold" class="colorTagSelector tagSelector gold" title="gold" name="tagSelector" style="background-color: rgb(212, 175, 55);"><input type="checkbox" value="purple" class="colorTagSelector tagSelector purple" title="purple" name="tagSelector" style="background-color: rgb(128, 0, 128);"><input type="checkbox" value="black" class="colorTagSelector tagSelector black" title="black" name="tagSelector" style="background-color: rgb(0, 0, 0);"><input type="checkbox" value="gray" class="colorTagSelector tagSelector gray" title="gray" name="tagSelector" style="background-color: rgb(128, 128, 128);"><input type="checkbox" value="white" class="colorTagSelector tagSelector white" title="white" name="tagSelector" style="background-color: rgb(255, 255, 255);"><input type="checkbox" value="silver" class="colorTagSelector tagSelector silver" title="silver" name="tagSelector" style="background-color: rgb(192, 192, 192);"><input type="checkbox" value="pink" class="colorTagSelector tagSelector pink" title="pink" name="tagSelector" style="background-color: rgb(255, 192, 203);"><input type="checkbox" value="indigo" class="colorTagSelector tagSelector indigo" title="indigo" name="tagSelector" style="background-color: rgb(75, 0, 130);"><input type="checkbox" value="aqua" class="colorTagSelector tagSelector aqua" title="aqua" name="tagSelector" style="background-color: rgb(0, 255, 255);"><input type="checkbox" value="tan" class="colorTagSelector tagSelector tan" title="tan" name="tagSelector" style="background-color: rgb(210, 180, 140);"><input type="checkbox" value="darkred" class="colorTagSelector tagSelector darkred" title="darkred" name="tagSelector" style="background-color: rgb(139, 0, 0);"><div class="actionSet">
                <label class="flex"><input type="radio" name="exportTagAction" data-mark="cross" class="actionBlacklist" value="blacklist"> <span>Do not process row with selected tag (blacklist)</span></label>
                <label class="flex"><input type="radio" name="exportTagAction" data-mark="check" class="actionWhitelist" value="whitelist"> <span>Only process row with selected tag (whitelist)</span></label>
                <label class="flex"><input type="radio" name="exportTagAction" data-mark="unknown" class="actionNone" value=""> <span>Ignore tag</span></label>
            </div><div class="fieldgroup">
        <button class="loadLastSelection">Load last selection</button>
        <button class="resetField">Reset</button>
    </div></div></div>
        </div>
    </div>
</div> */ 
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
        this.button = new RedBatchTranslatorButton(this);
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
/// <reference path="RedBatchTranslator.ts" />
var thisAddon = this;
$(document).ready(() => {
    trans.RedBatchTranslatorInstance = new RedBatchTranslator();
});
