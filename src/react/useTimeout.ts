import { useEffect } from 'react';

export const useTimeout = (callback: () => void, delay: number) => {
    useEffect(() => {
        if (delay !== null) {
            const id = setTimeout(callback, delay);
            return () => clearTimeout(id);
        }
    }, []);
};
