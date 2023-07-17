import type Rule from '../rules/rule';
import type { Schema } from '@decs/typeschema';
export type Signal<TContext, TValue> = {
    _schema: Schema<TValue>;
    evaluate: (context: TContext) => Promise<TValue>;
    not: Omit<Signal<TContext, TValue>, 'evaluate' | 'not'>;
    equals(value: TValue): Rule<TContext>;
    in(values: Array<TValue>): Rule<TContext>;
} & (TValue extends Array<infer TElement> ? {
    every(rule: Rule<TElement>): Rule<TContext>;
    some(rule: Rule<TElement>): Rule<TContext>;
    contains(value: TElement): Rule<TContext>;
    containsEvery(values: Array<TElement>): Rule<TContext>;
    containsSome(values: Array<TElement>): Rule<TContext>;
} : TValue extends boolean ? {
    isTrue(): Rule<TContext>;
    isFalse(): Rule<TContext>;
} : TValue extends number ? {
    lessThan(value: TValue): Rule<TContext>;
    lessThanOrEquals(value: TValue): Rule<TContext>;
    greaterThan(value: TValue): Rule<TContext>;
    greaterThanOrEquals(value: TValue): Rule<TContext>;
} : TValue extends string ? {
    includes(value: TValue): Rule<TContext>;
    endsWith(value: TValue): Rule<TContext>;
    startsWith(value: TValue): Rule<TContext>;
    matches(value: RegExp): Rule<TContext>;
} : Record<string, never>);
export type SignalFactory<TValue> = {
    _schema: Schema<TValue>;
    value: <TContext>(fn: (context: TContext) => TValue | Promise<TValue>) => Signal<TContext, TValue>;
};
export declare function type<TValue>(schema: Schema<TValue>): SignalFactory<TValue>;
