"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
const operators_1 = require("../core/operators");
const group_1 = __importDefault(require("./group"));
const inverse_1 = __importDefault(require("./inverse"));
const parse_1 = __importDefault(require("./parse"));
exports.rule = {
    every(rules) {
        return new group_1.default(operators_1.operator.$and, rules);
    },
    none(rules) {
        return new inverse_1.default(new group_1.default(operators_1.operator.$or, rules));
    },
    parse: parse_1.default,
    some(rules) {
        return new group_1.default(operators_1.operator.$or, rules);
    },
};
