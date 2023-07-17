import type { Signal } from './factory';
export type SignalSet<TContext> = Record<string, Signal<TContext, any>>;
export declare function getSignalKey<TContext, TValue>(signal: Signal<TContext, TValue>, signals: SignalSet<TContext>): string;
