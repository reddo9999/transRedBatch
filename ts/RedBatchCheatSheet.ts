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
const translatableCommentRegExp = /^NEVERNEVER$/g;
const translatablePluginJSRegExp = /[^\x21-\x7E\* ]+/g;
const translatableControlVariable = /.*/g;
const translatableVxAceScript = ["Vocab", "装備拡張", "Custom Menu Base"];

class RedBatchCheatSheet {
    public checkProject () {
        // Remove untranslatable rows
        trans.removeRowByContext(undefined, removableContexts, {
            matchAll: true
        });

        // Check Control Variables
        this.checkCollection(
            trans.travelContext(trans.getAllFiles(), "Control Variables"),
            translatableControlVariable
        );

        // Check notes
        this.checkCollection(
            trans.travelContext(trans.getAllFiles(), "note"),
            translatableNoteRegExp
        );

        // Check notes
        this.checkCollection(
            trans.travelContext(trans.getAllFiles(), "comment"),
            translatableCommentRegExp
        );

        // Check plugin command
        this.checkCollection(
            trans.travelContext(trans.getAllFiles(), "plugin"),
            translatablePluginRegExp
        );

        // Check plugins.js file
        this.checkFile("js/plugins.js", translatablePluginJSRegExp);

        // VX Ace inline scripts
        this.checkCollection(
            trans.travelContext(trans.getAllFiles(), "script/"),
            translatablePluginJSRegExp
        );

        this.checkCollection(
            trans.travelContext(trans.getAllFiles(), "inlinescript"),
            translatablePluginJSRegExp
        );


        // Red all js/plugins/
        for (let file in trans.project.files) {
            // VX Ace scripts (except vocab!)
            if (    file.indexOf("js/plugins/") != -1 || // MV/MZ plugins
                    (file.indexOf("Scripts/") != -1 && file.indexOf("Vocab") == -1) || // VX Ace scripts, except Vocab
                    file.indexOf("Game.ini") != -1 // VX Ace .ini... dangerous!
                ) {
                let fileData = trans.project.files[file];
                for (let index = 0; index < fileData.data.length; index++) {
                    trans.project.files[file].tags[index] = ["red"];
                }
            }
        }

        // "Scripts.txt"
        let fileData = trans.project.files["Scripts.txt"];
        if (fileData != undefined) {
            for (let index = 0; index < fileData.data.length; index++) {
                let text = fileData.data[index][0];
                let contexts = fileData.context[index];
                let yellow = false;
                for (let c = 0; c < contexts.length; c++) {
                    let context = contexts[c];
                    for (let t = 0; t < translatableVxAceScript.length; t++) {
                        let translatableContext = translatableVxAceScript[t];
                        if (context.indexOf("Scripts/" + translatableContext) != -1) {
                            fileData.tags[index] = ["yellow"];
                            yellow = true;
                            break; // on to the next row
                        }
                    }
                    if (!yellow) {
                        fileData.tags[index] = ["red"];
                    }
                }
            }
        }

        // Update view
        trans.refreshGrid();
        trans.evalTranslationProgress();
    }

    public checkCollection (collection : any, regExp : RegExp) {
        for (let file in collection) {
            let rows = collection[file];
            for (let index = 0; index < rows.length; index++) {
                if (rows[index] === true) {
                    this.checkRow(file, index, regExp);
                }
            }
        }
    }

    public checkFile (file : string, regExp : RegExp) {
        let fileData = trans.project.files[file];
        if (fileData != undefined) {
            for (let index = 0; index < fileData.data.length; index++) {
                this.checkRow(file, index, regExp);
            }
        }
    }

    public checkRow (file : string, index : number, regExp : RegExp) {
        let text = trans.project.files[file].data[index][0];
        if (text != null && text != undefined) {
            let search = text.search(regExp);
            if (search != -1) {
                trans.project.files[file].tags[index] = ["yellow"];
            } else {
                trans.project.files[file].tags[index] = ["red"];
            }
        }
    }
}

trans.batchCheckSheet = new RedBatchCheatSheet();