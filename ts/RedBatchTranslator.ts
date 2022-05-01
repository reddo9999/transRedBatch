/// <reference path="RedBatchTranslator/RedBatchTranslatorWindow.ts" />
/// <reference path="RedBatchTranslator/RedBatchTranslatorRow.ts" />
class RedBatchTranslator {
    private window : RedBatchTranslatorWindow;
    private saving : boolean = false;
    private saveAgain : boolean = false;

    constructor () {
        this.window = new RedBatchTranslatorWindow(this);
    }

    public open () {
        this.window.open();
    }

    public close () {
        this.window.close();
    }

    public refresh () {
        trans.refreshGrid();
        trans.evalTranslationProgress();
    }

    public translateProject (options : {
        translator : string,
        source : number,
        destination : number,
        ignoreTranslated : boolean,
        blacklist : Array<string>,
        whitelist : Array<string>,
        files : Array<string>,
        strict : boolean,
        saveOnEachBatch : boolean,
    }) {
        let aborted = false;
        ui.showLoading({buttons : [
            {
                text : "Abort",
                onClick : () => {
                    if (confirm(t("Are you sure you want to abort?"))) {
                        aborted = true; // :/
                        trans.abortTranslation();
                        this.refresh();
                    }
                }
            },
            {   text:"Pause",
                onClick: () => {
                    alert(t("Process paused!\nPress OK to continue!"));
                }
            },
        ]});
        ui.loadingProgress(0, "Starting up...")
        ui.log(`[RedBatchTranslator] Beginning translation at ${new Date()}`)
        
        let consoleWindow = $("#loadingOverlay .console")[0];
        let pre = document.createElement("pre");
        pre.style.whiteSpace = "pre-wrap";
        pre.appendChild(document.createTextNode(JSON.stringify({
            ...options,
            files : options.files.join("; ")
        }, undefined, 4)));
        consoleWindow.appendChild(pre);


        let translatorEngine : TranslatorEngine = trans[options.translator];
        let rows : Array<RedBatchTranslatorRow> = [];

        ui.loadingProgress(0, "Finding translatable rows")
        // Iterate through rows and add them up
        for (let i = 0; i < options.files.length; i++) {
            console.log(`[RedBatchTranslator] Working on ${options.files[i]}...`)
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
                } else if (options.whitelist.length > 0) {
                    // Only if your name is on the list
                    let tags = row.getTags();
                    if (tags.length == 0) {
                        if (!options.strict) {
                            // No tags, no strict, means we allow it through
                            rows.push(row);
                        }
                    } else {
                        for (let t = 0; t < tags.length; t++) {
                            if (options.whitelist.indexOf(tags[t]) != -1) {
                                rows.push(row);
                                break;
                            }
                        }
                    }
                } else {
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
        let batches : Array<Array<string>> = [];
        let batchesRows : Array<Array<RedBatchTranslatorRow>> = [];
        let maxLength = translatorEngine.maxRequestLength;
        let currentBatch : Array<string> = [];
        let currentBatchRows : Array<RedBatchTranslatorRow> = [];
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
            let alwaysSafeguard : any = undefined; // Stupid nodejs Timeout type

            let safeguardAlways = () => {
                if (alwaysSafeguard == undefined) {
                    alwaysSafeguard = setTimeout(always, 100);
                }
            };

            let always = () => {
                if (alwaysSafeguard != undefined) {
                    clearTimeout(alwaysSafeguard);
                    alwaysSafeguard = undefined;
                }
                let proceed = () => {
                    if (batchIndex >= batches.length) {
                        let batchEnd = Date.now();
                        ui.log(`[RedBatchTranslator] Finished translation at ${new Date()}`);
                        ui.log(`[RedBatchTranslator] Took ${Math.round(10 * (batchEnd - batchStart)/1000)/10} seconds.`);
                        ui.loadingProgress(100, "Finished!");
                        ui.showCloseButton();
                        this.refresh();
                    } else {
                        let batchDelay = translatorEngine.batchDelay;
                        if (batchDelay == undefined || batchDelay <= 1) {
                            translate();
                        } else {
                            ui.log(`[RedBatchTranslator] Waiting ${batchDelay}ms.`);
                            setTimeout(translate, batchDelay);
                        }
                    }
                };

                if (aborted) {
                    ui.log(`[RedBatchTranslator] Translation aborted.`);
                    ui.showCloseButton();
                    this.refresh();
                } else {
                    if (options.saveOnEachBatch) {
                        ui.log(`[RedBatchTranslator] Saving project...`);
                        this.saveProject();
                        proceed();
                    } else {
                        proceed();
                    }
                }
            };

            if (batches[myBatch] == undefined) {
                always();
            } else {
                translatorEngine.translate(
                    batches[myBatch],
                    {
                        onError : () => {
                            ui.error("[RedBatchTranslator] Failed to translate batch!");
                            safeguardAlways();
                        },
                        onAfterLoading : (result : {
                            sourceText : string,
                            translationText : string,
                            source : Array<string>,
                            translation : Array<string>
                        }) => {
                            this.insertIntoTables(result, batchesRows, myBatch, options.destination);
                            ui.loadingProgress(100 * (batchIndex + 1)/batches.length);
                            safeguardAlways();
                        },
                        always : always,
                        progress : (perc : number) => {
                            ui.loadingProgress(perc)
                        }
                    }
                );
            }
        };
        
        translate();
    }

    public async insertIntoTables (result : {
        sourceText : string,
        translationText : string,
        source : Array<string>,
        translation : Array<string>
    }, batchesRows : Array<Array<RedBatchTranslatorRow>>, myBatch : number, destination : number) {
        let text = document.createTextNode(`[RedBatchTranslator] Inserting into tables...`);
        this.print(text);
        for (let i = 0; i < result.translation.length; i++) {
            batchesRows[myBatch][i].setValue(result.translation[i], destination);
        }
    }

    public saveProject () {
        if (this.saving) {
            this.saveAgain = true;
        } else {
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

    public log (...texts : Array<string>) {
        let elements : Array<Text> = [];
        texts.forEach(text => {
            elements.push(document.createTextNode(text));
        });
        this.print(...elements);
    }

    public error (...texts : Array<string>) {
        let elements : Array<Text> = [];
        texts.forEach(text => {
            elements.push(document.createTextNode(text));
        });
        this.printError(...elements);
    }

    public print (...elements : Array<Element | Text>) {
        let consoleWindow = $("#loadingOverlay .console")[0];
        let pre = document.createElement("pre");
        pre.style.whiteSpace = "pre-wrap";
        elements.forEach(element => {
            pre.appendChild(element);
        });
        consoleWindow.appendChild(pre);
    }

    public printError (...elements : Array<Element | Text>) {
        let consoleWindow = $("#loadingOverlay .console")[0];
        let pre = document.createElement("pre");
        pre.style.color = "red";
        pre.style.fontWeight = "bold";
        pre.style.whiteSpace = "pre-wrap";
        elements.forEach(element => {
            pre.appendChild(element);
        });
        consoleWindow.appendChild(pre);
    }
}