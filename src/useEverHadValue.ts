import { useRef } from 'react';

export const useEverHadValue = function useEverHadValue(value: any, targetValue: any) {
    const ref = useRef<boolean>(false);
    ref.current = ref.current || value === targetValue;

    return ref.current;
};
