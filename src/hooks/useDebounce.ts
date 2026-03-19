// timi 5 5.mars seinni upptaka 33:38
import { useState, useEffect } from "react";

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);

        return () => {
            clearTimeout(handler)
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;