import { useRef } from 'react';

export function usePrevious<T>(value: T) {
    const ref = useRef<T>();
    const ret = ref.current;
    ref.current = value;
    return ret;
}
