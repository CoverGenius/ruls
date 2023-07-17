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
const typeschema_1 = require("@decs/typeschema");
const assert_1 = require("../core/assert");
const operators_1 = require("../core/operators");
const group_1 = __importDefault(require("./group"));
const inverse_1 = __importDefault(require("./inverse"));
const signal_1 = __importDefault(require("./signal"));
function assertObjectWithSingleKey(data) {
    if (data == null || typeof data !== 'object') {
        throw new Error('Expected an object, got: ' + data);
    }
    if (Object.keys(data).length !== 1) {
        throw new Error('Expected an object with a single key, got: ' + data);
    }
}
function assertOperatorKey(data) {
    if (!Object.keys(operators_1.operator).includes((0, assert_1.assertString)(data))) {
        throw new Error('Expected an operator key, got: ' + data);
    }
}
function parse(data, signals) {
    return __awaiter(this, void 0, void 0, function* () {
        assertObjectWithSingleKey(data);
        const key = Object.keys(data)[0];
        const value = data[key];
        switch (key) {
            case '$and':
            case '$or':
                return new group_1.default(operators_1.operator[key], yield Promise.all((0, assert_1.assertArray)(value).map(element => parse(element, signals))));
            case '$not':
                return new inverse_1.default(yield parse(value, signals));
        }
        const signal = signals[key];
        assertObjectWithSingleKey(value);
        const operatorKey = Object.keys(value)[0];
        assertOperatorKey(operatorKey);
        const operatorValue = value[operatorKey];
        const arraySignal = signal;
        const numberSignal = signal;
        const stringSignal = signal;
        switch (operatorKey) {
            case '$and':
            case '$or':
                return new signal_1.default(operators_1.operator[operatorKey], signal, [yield parse(operatorValue, signals)]);
            case '$not':
                throw new Error('Invalid operator key: ' + operatorKey);
            case '$all':
            case '$any':
                return new signal_1.default(operators_1.operator[operatorKey], arraySignal, yield (0, typeschema_1.assert)(arraySignal._schema, operatorValue));
            case '$inc':
            case '$pfx':
            case '$sfx':
                return new signal_1.default(operators_1.operator[operatorKey], stringSignal, yield (0, typeschema_1.assert)(stringSignal._schema, operatorValue));
            case '$rx':
                const match = (yield (0, typeschema_1.assert)(stringSignal._schema, operatorValue)).match(new RegExp('^/(.*?)/([dgimsuy]*)$'));
                if (match == null) {
                    throw new Error('Expected a regular expression, got: ' + operatorValue);
                }
                return new signal_1.default(operators_1.operator[operatorKey], signal, new RegExp(match[1], match[2]));
            case '$gt':
            case '$gte':
            case '$lt':
            case '$lte':
                return new signal_1.default(operators_1.operator[operatorKey], numberSignal, yield (0, typeschema_1.assert)(numberSignal._schema, operatorValue));
            case '$eq':
                return new signal_1.default(operators_1.operator[operatorKey], signal, operatorValue);
            case '$in':
                return new signal_1.default(operators_1.operator[operatorKey], signal, (0, assert_1.assertArray)(operatorValue));
        }
    });
}
exports.default = parse;
