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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOperatorKey = exports.operator = void 0;
exports.operator = {
    $all(first, second) {
        return second.every(element => first.includes(element));
    },
    $and(first, second) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = yield Promise.all(first.flatMap(firstElement => second.map(secondElement => secondElement.evaluate(firstElement))));
            return values.every(Boolean);
        });
    },
    $any(first, second) {
        return second.some(element => first.includes(element));
    },
    $eq(first, second) {
        return first === second;
    },
    $gt(first, second) {
        return first > second;
    },
    $gte(first, second) {
        return first >= second;
    },
    $in(first, second) {
        return second.includes(first);
    },
    $inc(first, second) {
        return first.includes(second);
    },
    $lt(first, second) {
        return first < second;
    },
    $lte(first, second) {
        return first <= second;
    },
    $not(value) {
        return !value;
    },
    $or(first, second) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = yield Promise.all(first.flatMap(firstElement => second.map(secondElement => secondElement.evaluate(firstElement))));
            return values.some(Boolean);
        });
    },
    $pfx(first, second) {
        return first.startsWith(second);
    },
    $rx(first, second) {
        return first.match(second) != null;
    },
    $sfx(first, second) {
        return first.endsWith(second);
    },
};
function getOperatorKey(fn) {
    const operatorKey = Object.keys(exports.operator).find(key => exports.operator[key] === fn);
    if (operatorKey == null) {
        throw new Error('Invalid operator: ' + fn);
    }
    return operatorKey;
}
exports.getOperatorKey = getOperatorKey;
