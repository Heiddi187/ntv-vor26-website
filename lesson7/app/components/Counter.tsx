import { useCounter } from "../context/CounterContext";

export function Counter() {
    const { count, dispatch } = useCounter();

    return (
        <div>
            <h2>Counter: {count}</h2>
            <button onClick={() => dispatch({ type: 'increment'})}>
                +
            </button>
            <button onClick={() => dispatch({ type: 'decrement'})}>
                -
            </button>
            <button onClick={() => dispatch({ type: 'reset'})}>
                Reset
            </button>
        </div>
    )
}