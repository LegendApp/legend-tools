const timeouts: Record<string, any> = {};

export function hasTimeoutOnce(name: string) {
    return !!timeouts[name];
}
export function timeoutOnce(name: string, cb: Function, time: number, ...args: any[]) {
    const t = timeouts[name];

    if (t) {
        clearTimeout(t);
    }

    timeouts[name] = setTimeout(() => {
        delete timeouts[name];

        cb(...args);
    }, time);
}
export function clearTimeoutOnce(name: string) {
    const t = timeouts[name];

    if (t) {
        clearTimeout(t);

        delete timeouts[name];
    }
}
