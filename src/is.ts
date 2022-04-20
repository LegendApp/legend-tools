export function isArray(obj: unknown): obj is Array<any> {
    return Array.isArray(obj);
}
export function isString(obj: unknown): obj is string {
    return typeof obj === 'string';
}
export function isObject(obj: unknown): obj is Record<any, any> {
    return typeof obj === 'object' && obj !== null && !isArray(obj);
}
export function isNumber(obj: unknown): obj is number {
    return typeof obj === 'number' && !isNaN(obj);
}
export function isBoolean(obj: unknown): obj is boolean {
    return obj === true || obj === false;
}
export function isFunction(obj: unknown): obj is Function {
    return typeof obj === 'function';
}
