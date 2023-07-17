"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.type = void 0;
const typeschema_1 = require("@decs/typeschema");
const operators_1 = require("../core/operators");
const inverse_1 = __importDefault(require("../rules/inverse"));
const signal_1 = __importDefault(require("../rules/signal"));
function createSignal(schema, fn) {
    return {
        _schema: schema,
        evaluate: (context) => __awaiter(this, void 0, void 0, function* () { return (0, typeschema_1.assert)(schema, yield fn(context)); }),
    };
}
function addOperators(signal) {
    return Object.assign(Object.assign({}, signal), { equals: value => new signal_1.default(operators_1.operator.$eq, signal, value), in: values => new signal_1.default(operators_1.operator.$in, signal, values) });
}
function addArrayOperators(signal) {
    const arraySignal = signal;
    return Object.assign(Object.assign({}, signal), { contains: value => new signal_1.default(operators_1.operator.$all, arraySignal, [value]), containsEvery: values => new signal_1.default(operators_1.operator.$all, arraySignal, values), containsSome: values => new signal_1.default(operators_1.operator.$any, arraySignal, values), every: rule => new signal_1.default(operators_1.operator.$and, arraySignal, [rule]), some: rule => new signal_1.default(operators_1.operator.$or, arraySignal, [rule]) });
}
function addBooleanOperators(signal) {
    const booleanSignal = signal;
    return Object.assign(Object.assign({}, signal), { isFalse: () => new signal_1.default(operators_1.operator.$eq, booleanSignal, false), isTrue: () => new signal_1.default(operators_1.operator.$eq, booleanSignal, true) });
}
function addNumberOperators(signal) {
    const numberSignal = signal;
    return Object.assign(Object.assign({}, signal), { greaterThan: value => new signal_1.default(operators_1.operator.$gt, numberSignal, value), greaterThanOrEquals: value => new signal_1.default(operators_1.operator.$gte, numberSignal, value), lessThan: value => new signal_1.default(operators_1.operator.$lt, numberSignal, value), lessThanOrEquals: value => new signal_1.default(operators_1.operator.$lte, numberSignal, value) });
}
function addStringOperators(signal) {
    const stringSignal = signal;
    return Object.assign(Object.assign({}, signal), { endsWith: value => new signal_1.default(operators_1.operator.$sfx, stringSignal, value), includes: value => new signal_1.default(operators_1.operator.$inc, stringSignal, value), matches: value => new signal_1.default(operators_1.operator.$rx, stringSignal, value), startsWith: value => new signal_1.default(operators_1.operator.$pfx, stringSignal, value) });
}
function addModifiers(signal) {
    return Object.assign(Object.assign({}, signal), { not: new Proxy(signal, {
            get: (target, property, receiver) => {
                const value = Reflect.get(target, property, receiver);
                return typeof value === 'function'
                    ? (...args) => new inverse_1.default(value.bind(target)(...args))
                    : value;
            },
        }) });
}
function type(schema) {
    return {
        _schema: schema,
        value(fn) {
            return [
                addOperators,
                addArrayOperators,
                addBooleanOperators,
                addNumberOperators,
                addStringOperators,
                addModifiers,
            ].reduce((value, operation) => operation(value), createSignal(schema, fn));
        },
    };
}
exports.type = type;
