import {operator} from '../core/operators';
import Rule from '../rules/rule';
import SignalRule from '../rules/signal';
import AnySignal from './any';

export default class StringSignal<
  TContext,
  TValue extends string,
> extends AnySignal<TContext, TValue> {
  endsWith(value: TValue): Rule<TContext> {
    return new SignalRule(operator.$sfx, this, value);
  }

  includes(value: TValue): Rule<TContext> {
    return new SignalRule(operator.$inc, this, value);
  }

  startsWith(value: TValue): Rule<TContext> {
    return new SignalRule(operator.$pfx, this, value);
  }
}
