declare class RedBatchTranslatorButton {
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
declare function t(text: string): string;
declare class RedButtonManagerButton {
    name: string;
    icon: string;
    title: string;
    action: () => void | Promise<void>;
    private element;
    constructor(name: string, icon: string, title: string, action: () => void | Promise<void>);
    setIcon(icon: string): void;
    getButton(): HTMLButtonElement;
}
declare const wordWrapNoPicture = "60";
declare const wordWrapPicture = "50";
declare var thisAddon: any;
declare const removableContexts: string[];
declare const translatableNoteRegExp: RegExp;
declare const translatablePluginRegExp: RegExp;
declare const translatablePluginJSRegExp: RegExp;
declare const translatableControlVariable: RegExp;
declare class RedBatchCheatSheet {
    checkProject(): void;
    checkCollection(collection: any, regExp: RegExp): void;
    checkFile(file: string, regExp: RegExp): void;
    checkRow(file: string, index: number, regExp: RegExp): void;
}
