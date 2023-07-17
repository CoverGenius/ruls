"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const evaluator_1 = __importDefault(require("../core/evaluator"));
/**
 * Allows you to define complex conditions and criteria for decision-making. It
 * consists of one or more signals, which can be combined using logical
 * operators to create intricate structures.
 *
 * Takes a TContext argument which encapsulates the necessary information
 * required by signals to make decisions and determine the outcome of rules.
 */
class Rule extends evaluator_1.default {
}
exports.default = Rule;
