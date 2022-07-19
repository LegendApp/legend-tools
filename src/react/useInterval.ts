import { useEffect } from 'react';

export function useInterval(cb: (() => void) | undefined, ms: number) {
    useEffect(() => {
        if (cb && ms !== undefined && ms !== null) {
            const interval = setInterval(cb, ms);

            return () => clearInterval(interval);
        }
        return undefined;
    }, [ms, cb]);
}
