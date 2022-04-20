// @ts-ignore
let ResizeObserver = typeof window !== 'undefined' && window?.ResizeObserver;

const polyfillResizeObserver = function polyfillResizeObserver(resizeObserver: any) {
    // @ts-ignore
    ResizeObserver = window?.ResizeObserver || resizeObserver;
};

export { ResizeObserver, polyfillResizeObserver };
