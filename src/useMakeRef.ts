import { MutableRefObject, useRef } from 'react';

export function useMakeRef<T>(value: T): MutableRefObject<T | undefined> {
    const ref = useRef<T>();
    ref.current = value;
    return ref;
}
