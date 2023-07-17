export default abstract class Evaluator<TContext, TValue> {
    protected fn: (context: TContext) => TValue | Promise<TValue>;
    constructor(fn: (context: TContext) => TValue | Promise<TValue>);
    evaluate(context: TContext): Promise<TValue>;
}
