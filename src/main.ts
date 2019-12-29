import * as acorn from "acorn";
import {Options} from "acorn";
import * as ESTree from "estree";
import evaluate from "./eval";
import {Scope} from "./scope";

declare const require: (module: string) => any;
const options: Options = {
    ecmaVersion: 2015,
    sourceType: "script",
    locations: true
};

declare const Promise: any;

// 导出默认对象
const default_api: { [key: string]: any } = {
    console,

    setTimeout,
    setInterval,

    clearTimeout,
    clearInterval,

    encodeURI,
    encodeURIComponent,
    decodeURI,
    decodeURIComponent,
    escape,
    unescape,

    Infinity,
    NaN,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    Object,
    Boolean,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    Number,
    Math,
    Date,
    String,
    RegExp,
    Array,
    JSON,
    Promise
};

export function run(code: string, append_api: { [key: string]: any } = {}) {
    const scope = new Scope("block");
    scope.$const("this", this);

    for (const name of Object.getOwnPropertyNames(default_api)) {
        scope.$const(name, default_api[name]);
    }

    for (const name of Object.getOwnPropertyNames(append_api)) {
        scope.$const(name, append_api[name]);
    }

    // 定义 module
    const $exports = {};
    const $module = {exports: $exports};
    scope.$const("module", $module);
    scope.$const("exports", $exports);

    const program = <ESTree.Node>acorn.parse(code, options);
    evaluate(program, scope);

    // exports
    const module_var = scope.$find("module");
    return module_var?.$get().exports;
}
