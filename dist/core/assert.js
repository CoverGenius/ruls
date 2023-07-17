"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertString = exports.assertNumber = exports.assertBoolean = exports.assertArray = void 0;
function assertArray(value) {
    if (!Array.isArray(value)) {
        throw new Error('Expected an array, got: ' + value);
    }
    return value;
}
exports.assertArray = assertArray;
function assertBoolean(value) {
    if (typeof value !== 'boolean') {
        throw new Error('Expected a boolean, got: ' + value);
    }
    return value;
}
exports.assertBoolean = assertBoolean;
function assertNumber(value) {
    if (typeof value !== 'number') {
        throw new Error('Expected a number, got: ' + value);
    }
    return value;
}
exports.assertNumber = assertNumber;
function assertString(value) {
    if (typeof value !== 'string') {
        throw new Error('Expected a string, got: ' + value);
    }
    return value;
}
exports.assertString = assertString;
