import type { SignalSet } from '../signals';
import type { EncodedRule } from './rule';
import Rule from './rule';
export type EncodedInverseRule<TContext> = {
    $not: EncodedRule<TContext>;
};
export default class InverseRule<TContext> extends Rule<TContext> {
    protected rule: Rule<TContext>;
    constructor(rule: Rule<TContext>);
    encode(signals: SignalSet<TContext>): EncodedInverseRule<TContext>;
}
