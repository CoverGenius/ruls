"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignalKey = void 0;
function getSignalKey(signal, signals) {
    const signalKey = Object.keys(signals).find(key => signals[key].equals === signal.equals);
    if (signalKey == null) {
        throw new Error('Invalid signal: ' + signal.evaluate);
    }
    return signalKey;
}
exports.getSignalKey = getSignalKey;
