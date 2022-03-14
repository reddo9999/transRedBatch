class RedBatchTranslatorWindow {
    private parent : RedBatchTranslator;
    private container = document.createElement("div");
	private transSelect : HTMLSelectElement;

    constructor (parent : RedBatchTranslator) {
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

        contents.appendChild($("<h2 style='margin: 0px;'>Select Translator</h2>")[0])
        contents.appendChild($("<hr></hr>")[0]);

		this.transSelect = this.getTranslatorsSelect();
		contents.appendChild(this.transSelect);

    }

    public open () {
        document.body.appendChild(this.container);

		let updateTransSelect = this.getTranslatorsSelect();
		this.transSelect.parentElement!.replaceChild(this.transSelect, updateTransSelect);
		this.transSelect = updateTransSelect;
    }

    public close () {
        document.body.removeChild(this.container);
    }

	public getTranslatorsSelect () {
		let transSelect = document.createElement("select");
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
			transSelect.appendChild(option);
		});

		return transSelect;
	}
}