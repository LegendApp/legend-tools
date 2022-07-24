import { useMakeRef } from './useMakeRef';
import { useCallback } from 'react';

export function useStableCallback(callback: (...args: any[]) => void) {
    const ref = useMakeRef(callback);
    return useCallback((...args) => {
        ref.current?.(...args);
    }, []);
}
