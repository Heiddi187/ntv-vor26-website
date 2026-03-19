import { createContext, ReactNode, useContext, useReducer } from "react";

type CounterAction =
   | { type: "increment"; }
   | { type: "decrement"; }
   | { type: "reset"; };

function counterReducer(state: number, action: CounterAction): number {
   switch (action.type) {
      case "increment":
         return state + 1;
      case "decrement":
         return state - 1;
      case "reset":
         return 0;
      default:
         return state;
   }
}

type CounterContextType = {
   count: number;
   dispatch: React.Dispatch<CounterAction>;
};

export const CounterContext = createContext<CounterContextType | null>(null);

export function CounterProvider({ children }: {children: ReactNode }) {
    const [count, dispatch] = useReducer(counterReducer, 0);

    return (
        <CounterContext.Provider value={{ count, dispatch }}>
            {children}
        </CounterContext.Provider>
    )
}

export function useCounter() {
    const context = useContext(CounterContext);
    if (!context) throw new Error('useCounter must me used inside provider');
    return context;
}