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
const operators_1 = require("../core/operators");
const set_1 = require("../signals/set");
const rule_1 = __importDefault(require("./rule"));
class SignalRule extends rule_1.default {
    constructor(operator, first, second) {
        super((context) => __awaiter(this, void 0, void 0, function* () { return operator(yield first.evaluate(context), second); }));
        this.operator = operator;
        this.first = first;
        this.second = second;
    }
    encode(signals) {
        return {
            [(0, set_1.getSignalKey)(this.first, signals)]: {
                [(0, operators_1.getOperatorKey)(this.operator)]: this.second instanceof rule_1.default
                    ? this.second.encode(signals)
                    : this.second instanceof RegExp
                        ? this.second.toString()
                        : this.second,
            },
        };
    }
}
exports.default = SignalRule;
