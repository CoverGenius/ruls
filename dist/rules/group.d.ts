import type { SignalSet } from '../signals';
import type { EncodedRule } from './rule';
import Rule from './rule';
export type EncodedGroupRule<TContext> = {
    [operator: string]: Array<EncodedRule<TContext>>;
};
export default class GroupRule<TContext> extends Rule<TContext> {
    protected operator: (context: Array<TContext>, rules: Array<Rule<TContext>>) => Promise<boolean>;
    protected rules: Array<Rule<TContext>>;
    constructor(operator: (context: Array<TContext>, rules: Array<Rule<TContext>>) => Promise<boolean>, rules: Array<Rule<TContext>>);
    encode(signals: SignalSet<TContext>): EncodedGroupRule<TContext>;
}
