import { RefObject, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { ResizeObserver } from './ResizeObserver';
import { useForceRender } from './useForceRender';

function getSize(el: HTMLElement): { width: number; height: number } {
    return el
        ? {
              width: el.offsetWidth,
              height: el.offsetHeight,
          }
        : {
              width: 0,
              height: 0,
          };
}

export const useComponentSize = function useComponentSize(ref: RefObject<HTMLElement>): { width: number; height: number } {
    const refSize = useRef<{ width: number; height: number }>({ width: 0, height: 0 });
    const fr = useForceRender();

    const handleResize = useCallback(() => {
        if (ref.current) {
            const oldSize = refSize.current;
            const newSize = getSize(ref.current);
            if (newSize && (newSize.width !== oldSize.width || newSize.height !== oldSize.height)) {
                refSize.current = newSize;
                fr();
            }
        }
    }, [ref, fr]);

    // @ts-ignore
    useLayoutEffect(() => {
        const el = ref.current;
        if (el) {
            handleResize();

            let resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(el);

            return () => {
                resizeObserver.disconnect();
                resizeObserver = undefined;
            };
        }
    }, [ref.current]); // eslint-disable-line react-hooks/exhaustive-deps

    return refSize.current;
};

export const useComponentSizeChange = function useComponentSizeChange(
    ref: RefObject<HTMLElement>,
    cb: (value: { width: number; height: number }) => void
) {
    const refSize = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

    const handleResize = useCallback(() => {
        if (ref.current) {
            const oldSize = refSize.current;
            const newSize = getSize(ref.current);
            if (newSize && (newSize.width !== oldSize.width || newSize.height !== oldSize.height)) {
                refSize.current = newSize;
                cb?.(newSize);
            }
        }
    }, [ref, cb]);

    // @ts-ignore
    useEffect(() => {
        const el = ref.current;
        if (el) {
            handleResize();

            let resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(el);

            return () => {
                resizeObserver.disconnect();
                resizeObserver = undefined;
            };
        }
    }, [ref.current]); // eslint-disable-line react-hooks/exhaustive-deps

    return refSize.current;
};
