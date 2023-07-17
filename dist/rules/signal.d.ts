import type { Signal, SignalSet } from '../signals';
import Rule from './rule';
export type EncodedSignalRule = {
    [signal: string]: {
        [operator: string]: unknown;
    };
};
export default class SignalRule<TContext, TFirst, TSecond> extends Rule<TContext> {
    protected operator: (first: TFirst, second: TSecond) => boolean | Promise<boolean>;
    protected first: Signal<TContext, TFirst>;
    protected second: TSecond;
    constructor(operator: (first: TFirst, second: TSecond) => boolean | Promise<boolean>, first: Signal<TContext, TFirst>, second: TSecond);
    encode(signals: SignalSet<TContext>): EncodedSignalRule;
}
