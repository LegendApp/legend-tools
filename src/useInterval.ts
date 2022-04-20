import { useEffect } from 'react';

export function useInterval(cb: () => void, ms: number) {
    useEffect(() => {
        const int = setInterval(() => {
            cb();
        }, ms);

        return () => clearInterval(int);
    }, [ms, cb]);
}
