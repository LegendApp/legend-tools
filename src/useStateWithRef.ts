import { Dispatch, MutableRefObject, SetStateAction, useCallback, useRef, useState } from 'react';
import { isFunction } from './is';

export function useStateWithRef<T>(initialValue?: T | (() => T)): [T | undefined, Dispatch<SetStateAction<T>>, MutableRefObject<T>] {
    const [value, setValue] = useState(initialValue);
    const ref = useRef<T>(value);

    // Set wraps around useState's set and saves to ref
    const set = useCallback((v: T | ((prevState: T) => T)) => {
        if (isFunction(v)) {
            v = v(ref.current);
        }
        ref.current = v;
        setValue(v);
    }, []);

    return [value, set, ref];
}
