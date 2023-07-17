"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("../core/operators");
const rule_1 = __importDefault(require("./rule"));
class GroupRule extends rule_1.default {
    constructor(operator, rules) {
        super(context => operator([context], rules));
        this.operator = operator;
        this.rules = rules;
    }
    encode(signals) {
        return {
            [(0, operators_1.getOperatorKey)(this.operator)]: this.rules.map(rule => rule.encode(signals)),
        };
    }
}
exports.default = GroupRule;
