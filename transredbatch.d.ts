declare class RedBatchTranslatorButton {
}
declare class RedBatchTranslatorWindow {
    private parent;
    private $monster;
    private monster;
    private selectTrans;
    private selectSource;
    private selectDestination;
    private checkSave;
    private checkIgnore;
    private checkStrict;
    private blacklistContainer;
    private whitelistContainer;
    constructor(parent: RedBatchTranslator);
    open(): void;
    translate(): void;
    getTags(container: HTMLDivElement): string[];
    close(): void;
    updateColumns(): void;
    updateTranslatorsSelect(): void;
}
declare class RedBatchTranslatorRow {
    private location;
    constructor(file: string, index: number);
    getValue(source: number): any;
    isEmpty(source: number): boolean;
    isTranslated(): boolean;
    setValue(text: string, destination: number): void;
    getTags(): any;
}
declare class RedPerformance {
    private perfStart;
    private perfEnd;
    end(): void;
    getSeconds(): number;
}
declare class RedBatchTranslator {
    private window;
    private saving;
    private saveAgain;
    constructor();
    open(): void;
    close(): void;
    refresh(): void;
    translateProject(options: {
        translator: string;
        source: number;
        destination: number;
        ignoreTranslated: boolean;
        blacklist: Array<string>;
        whitelist: Array<string>;
        files: Array<string>;
        strict: boolean;
        saveOnEachBatch: boolean;
    }): void;
    saveProject(): void;
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
