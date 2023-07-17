import type Rule from './rule';
import parse from './parse';
export type { default as Rule } from './rule';
export declare const rule: {
    every<TContext>(rules: Rule<TContext>[]): Rule<TContext>;
    none<TContext_1>(rules: Rule<TContext_1>[]): Rule<TContext_1>;
    parse: typeof parse;
    some<TContext_2>(rules: Rule<TContext_2>[]): Rule<TContext_2>;
};
