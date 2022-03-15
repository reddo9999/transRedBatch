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
    private panel = <HTMLElement> document.getElementsByClassName("toolbar-content toolbar3")[0];
    private button : HTMLElement;

    constructor () {
        this.button = document.createElement("button");
        this.button.classList.add("menu-button", "batch-translate");
        this.button.title = "Red Batch Checkup";
        this.button.style.filter = "hue-rotate(100deg)"; // Green to red
        this.button.title = "Red Batch Checkup";

        let img = document.createElement("img");
        img.src = "img/translate_all.png";
        img.alt = "red batch translation";
        this.button.appendChild(img);
        this.panel.appendChild(this.button);

        this.button.addEventListener("click", () => {
            this.checkProject();
        });
    }

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
            if (    file.indexOf("js/plugins/") != -1 || 
                    (file.indexOf("Scripts/") != -1 && file.indexOf("Vocab") == -1)
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