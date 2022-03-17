class RedBatchTranslatorWindow {
    private parent : RedBatchTranslator;
    private $monster = $(`
    <div class='ui-widget-overlay ui-front' style='opacity: 1; background-color: rgba(170, 170, 170, 0.3); display: flex; justify-content: center; align-items: center;'><div style='background-color: white; width: 600px; font-size: 1.2ex; position: relative;'><div style='background-color: black; color: white; line-height: 30px; padding-left: 10px;'><h1 style='margin:0px'>Red Batch Translation</h1></div><div style='padding: 10px;'><h2 style='margin: 0px;'>Select Translator<select id='redBatchTranslatorSelect' style='margin-left: 2ex'></select></h2><hr><div class='flex col-2'><div class='fieldmember sourceCol'><h2 style='margin:0px'>Source column</h2><label class='columnSelector'><select id='redBatchTranslatorSourceSelect'></select></label><div class='smallInfo'>Which column is the source text to translate for?<br>(default is key column / leftmost column).</div></div><div class='fieldmember'><h2 style='margin:0px'>Target column</h2><label class='targetCol'><select id='redBatchTranslatorDestinationSelect'></select></label><div class='smallInfo'>Which column is the translated text put into.<br>(Can not same with source column)</div></div></div><hr><h2 style='margin: 0px; margin-bottom: 1ex;'>Options</h2><label class='flex fullWidth bottomSpace'><div class='flexMain'><h3 class='label' style='margin: 0px;'>Save on each Batch</h3><div class='info'>If checked, the project is saved after every batch translation.</div></div><div><input checked='true' class='flipSwitch translateOther' id='redBatchTranslatorSave' type='checkbox' value='1'></div></label><label class='flex fullWidth bottomSpace'><div class='flexMain'><h3 class='label' style='margin: 0px;'>Ignore translated</h3><div class='info'>If checked, rows with translations will not be translated.</div></div><div><input checked='true' class='flipSwitch translateOther' id='redBatchTranslatorIgnore' type='checkbox' value='1'></div></label><label class='flex fullWidth bottomSpace'><div class='flexMain'><h3 class='label' style='margin: 0px;'>Strict Whitelist</h3><div class='info'>If checked, rows with no tags can fail the whitelist.</div></div><div><input class='flipSwitch translateOther' id='redBatchTranslatorStrict' type='checkbox' value='1'></div></label><hr><div class='options fieldgroup' id='redBatchTranslatorBlacklist'><div class='fieldmember'><h2 style='margin: 0px;'>Blacklist</h2><div class='info'>Rows that have any of the selected tags will not be translated</div><div class='colorTagSelector'><div class='uiTags uiTagsWrapper rendered' data-mark='unknown'><input checked='true' class='colorTagSelector tagSelector red' name='tagSelector' style='background-color: rgb(255, 0, 0);' title='red' type='checkbox' value='red'><input class='colorTagSelector tagSelector yellow' name='tagSelector' style='background-color: rgb(255, 255, 0);' title='yellow' type='checkbox' value='yellow'><input class='colorTagSelector tagSelector green' name='tagSelector' style='background-color: rgb(0, 128, 0);' title='green' type='checkbox' value='green'><input class='colorTagSelector tagSelector blue' name='tagSelector' style='background-color: rgb(0, 0, 255);' title='blue' type='checkbox' value='blue'><input class='colorTagSelector tagSelector gold' name='tagSelector' style='background-color: rgb(212, 175, 55);' title='gold' type='checkbox' value='gold'><input class='colorTagSelector tagSelector purple' name='tagSelector' style='background-color: rgb(128, 0, 128);' title='purple' type='checkbox' value='purple'><input class='colorTagSelector tagSelector black' name='tagSelector' style='background-color: rgb(0, 0, 0);' title='black' type='checkbox' value='black'><input class='colorTagSelector tagSelector gray' name='tagSelector' style='background-color: rgb(128, 128, 128);' title='gray' type='checkbox' value='gray'><input class='colorTagSelector tagSelector white' name='tagSelector' style='background-color: rgb(255, 255, 255);' title='white' type='checkbox' value='white'><input class='colorTagSelector tagSelector silver' name='tagSelector' style='background-color: rgb(192, 192, 192);' title='silver' type='checkbox' value='silver'><input class='colorTagSelector tagSelector pink' name='tagSelector' style='background-color: rgb(255, 192, 203);' title='pink' type='checkbox' value='pink'><input class='colorTagSelector tagSelector indigo' name='tagSelector' style='background-color: rgb(75, 0, 130);' title='indigo' type='checkbox' value='indigo'><input class='colorTagSelector tagSelector aqua' name='tagSelector' style='background-color: rgb(0, 255, 255);' title='aqua' type='checkbox' value='aqua'><input class='colorTagSelector tagSelector tan' name='tagSelector' style='background-color: rgb(210, 180, 140);' title='tan' type='checkbox' value='tan'><input class='colorTagSelector tagSelector darkred' name='tagSelector' style='background-color: rgb(139, 0, 0);' title='darkred' type='checkbox' value='darkred'></div></div></div></div><hr><div class='options fieldgroup' id='redBatchTranslatorWhitelist'><div class='fieldmember'><h2 style='margin: 0px;'>Whitelist</h2><div class='info'>If any of the following colors is selected, only rows with that color will be translated. This overrides the Blacklist.</div><div class='colorTagSelector'><div class='uiTags uiTagsWrapper rendered' data-mark='unknown'><input class='colorTagSelector tagSelector red' name='tagSelector' style='background-color: rgb(255, 0, 0);' title='red' type='checkbox' value='red'><input class='colorTagSelector tagSelector yellow' name='tagSelector' style='background-color: rgb(255, 255, 0);' title='yellow' type='checkbox' value='yellow'><input class='colorTagSelector tagSelector green' name='tagSelector' style='background-color: rgb(0, 128, 0);' title='green' type='checkbox' value='green'><input class='colorTagSelector tagSelector blue' name='tagSelector' style='background-color: rgb(0, 0, 255);' title='blue' type='checkbox' value='blue'><input class='colorTagSelector tagSelector gold' name='tagSelector' style='background-color: rgb(212, 175, 55);' title='gold' type='checkbox' value='gold'><input class='colorTagSelector tagSelector purple' name='tagSelector' style='background-color: rgb(128, 0, 128);' title='purple' type='checkbox' value='purple'><input class='colorTagSelector tagSelector black' name='tagSelector' style='background-color: rgb(0, 0, 0);' title='black' type='checkbox' value='black'><input class='colorTagSelector tagSelector gray' name='tagSelector' style='background-color: rgb(128, 128, 128);' title='gray' type='checkbox' value='gray'><input class='colorTagSelector tagSelector white' name='tagSelector' style='background-color: rgb(255, 255, 255);' title='white' type='checkbox' value='white'><input class='colorTagSelector tagSelector silver' name='tagSelector' style='background-color: rgb(192, 192, 192);' title='silver' type='checkbox' value='silver'><input class='colorTagSelector tagSelector pink' name='tagSelector' style='background-color: rgb(255, 192, 203);' title='pink' type='checkbox' value='pink'><input class='colorTagSelector tagSelector indigo' name='tagSelector' style='background-color: rgb(75, 0, 130);' title='indigo' type='checkbox' value='indigo'><input class='colorTagSelector tagSelector aqua' name='tagSelector' style='background-color: rgb(0, 255, 255);' title='aqua' type='checkbox' value='aqua'><input class='colorTagSelector tagSelector tan' name='tagSelector' style='background-color: rgb(210, 180, 140);' title='tan' type='checkbox' value='tan'><input class='colorTagSelector tagSelector darkred' name='tagSelector' style='background-color: rgb(139, 0, 0);' title='darkred' type='checkbox' value='darkred'></div></div></div></div></div><div class='ui-dialog-buttonset' style='text-align: right; position: absolute; bottom: 4px; right: 4px;'><button class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only' icon='ui-icon-close' id='redBatchTranslatorClose' role='button' type='button'><span class='ui-button-text'>Cancel</span></button><button class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only' icon='ui-icon-plus' id='redBatchTranslatorTranslate' role='button' type='button'><span class='ui-button-text'>Translate Now</span></button></div></div></div>
    `);
    private monster : HTMLDivElement;
    private selectTrans : HTMLSelectElement;
    private selectSource : HTMLSelectElement;
    private selectDestination : HTMLSelectElement;
    private checkSave : HTMLInputElement;
    private checkIgnore : HTMLInputElement;
    private checkStrict : HTMLInputElement;
    private blacklistContainer : HTMLDivElement;
    private whitelistContainer : HTMLDivElement;

    constructor (parent : RedBatchTranslator) {
        this.parent = parent;
        this.monster = <HTMLDivElement> this.$monster[0];
        // Search the monster for our elements
        this.selectTrans = <HTMLSelectElement> this.$monster.find("#redBatchTranslatorSelect")[0];
        this.selectSource = <HTMLSelectElement> this.$monster.find("#redBatchTranslatorSourceSelect")[0];
        this.selectDestination = <HTMLSelectElement> this.$monster.find("#redBatchTranslatorDestinationSelect")[0];
        this.checkSave = <HTMLInputElement> this.$monster.find("#redBatchTranslatorSave")[0];
        this.checkIgnore = <HTMLInputElement> this.$monster.find("#redBatchTranslatorIgnore")[0];
        this.checkStrict = <HTMLInputElement> this.$monster.find("#redBatchTranslatorStrict")[0];
        this.blacklistContainer = <HTMLDivElement> this.$monster.find("#redBatchTranslatorBlacklist")[0];
        this.whitelistContainer = <HTMLDivElement> this.$monster.find("#redBatchTranslatorWhitelist")[0];

        // Buttons
        this.$monster.find("#redBatchTranslatorClose")[0].addEventListener("click", () => {
            this.close();
        });

        this.$monster.find("#redBatchTranslatorTranslate")[0].addEventListener("click", () => {
            this.close();
            this.translate();
        });
    }

    public open () {
        this.updateColumns();
        this.updateTranslatorsSelect();

        // Show
        document.body.appendChild(this.monster);
    }

    public translate () {
        // Do we have some files or not?
        let files = trans.getCheckedFiles();
        if (files.length == 0) {
            files = trans.getAllFiles();
        }

        let options = {
            translator : this.selectTrans.value,
            source : parseInt(this.selectSource.value),
            destination : parseInt(this.selectDestination.value),
            ignoreTranslated : this.checkIgnore.checked,
            strict : this.checkStrict.checked,
            saveOnEachBatch : this.checkSave.checked,
            blacklist : this.getTags(this.blacklistContainer),
            whitelist: this.getTags(this.whitelistContainer),
            files : files
        }
        
        this.parent.translateProject(options);
    }

    public getTags (container : HTMLDivElement) {
        let tags : Array<string> = [];
        let elements = container.getElementsByClassName("tagSelector");
        for (let i = 0; i < elements.length; i++) {
            let element = <HTMLInputElement> elements[i];
            if (element.checked) {
                tags.push(element.title);
            }
        }
        return tags;
    }

    public close () {
        document.body.removeChild(this.monster);
    }

    public updateColumns () {
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

	public updateTranslatorsSelect () {
        let oldTrans = this.selectTrans.value == "" ? trans.project.options.translator : this.selectTrans.value;
        // Remove old
        while (this.selectTrans.firstChild) {
            this.selectTrans.removeChild(this.selectTrans.firstChild);
        }

		let transOptions : Array<HTMLOptionElement> = [];

		for (let i = 0; i < trans.translator.length; i++) {
			let id = trans.translator[i];
			let name = trans[id].name;
			let option = document.createElement("option");
			option.value = id;
			option.appendChild(document.createTextNode(name));
			transOptions.push(option);
		}

		transOptions.sort((a,b) => {
			let na = a.childNodes[0].nodeValue!;
			let nb = b.childNodes[0].nodeValue!;
			if (na < nb) return 1;
			else if (na > nb) return -1;
			return 0;
		});

		transOptions.forEach((option) => {
			this.selectTrans.appendChild(option);
		});

        this.selectTrans.value = oldTrans;
	}
}