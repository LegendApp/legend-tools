const animationFrames: Record<string, number> = {};

export function hasAnimationFrameOnce(name: string) {
    return !!animationFrames[name];
}
export function animationFrameOnce(name: string, cb: Function) {
    const t = animationFrames[name];

    if (t) {
        cancelAnimationFrame(t);
    }

    animationFrames[name] = requestAnimationFrame(() => {
        delete animationFrames[name];

        cb();
    });
}
export function clearAnimationFrameOnce(name: string) {
    const t = animationFrames[name];

    if (t) {
        cancelAnimationFrame(t);

        delete animationFrames[name];
    }
}
