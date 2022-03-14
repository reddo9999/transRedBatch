declare class RedBatchTranslatorButton {
    private panel;
    private button;
    private parent;
    constructor(parent: RedBatchTranslator);
}
declare class RedBatchTranslatorWindow {
    private parent;
    private container;
    private transSelect;
    constructor(parent: RedBatchTranslator);
    open(): void;
    close(): void;
    getTranslatorsSelect(): HTMLSelectElement;
}
declare class RedBatchTranslatorRow {
    private location;
    constructor(file: string, index: number);
    getValue(): any;
    isTranslated(): boolean;
    setValue(text: string, destination: number): void;
    getTags(): any;
}
declare class RedBatchTranslator {
    private button;
    private window;
    constructor();
    open(): void;
    close(): void;
    translateProject(options: {
        translator: string;
        destination: number;
        ignoreTranslated: boolean;
        blacklist: Array<string>;
        whitelist: Array<string>;
        files: Array<string>;
        strict: boolean;
        saveOnEachBatch: boolean;
    }): void;
}
declare var thisAddon: any;
