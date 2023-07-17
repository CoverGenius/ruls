import type { SignalSet } from '../signals';
import type Rule from './rule';
export default function parse<TContext>(data: unknown, signals: SignalSet<TContext>): Promise<Rule<TContext>>;
