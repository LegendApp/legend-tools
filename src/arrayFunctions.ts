export function arrayRemove<T>(array: T[], value: T) {
    const index = array.indexOf(value);
    if (index >= 0) {
        array.splice(index, 1);
    }

    return index;
}

export function arrayRemoveAt<T>(array: T[], index: number) {
    return array.splice(index, 1)[0];
}

// Binary search to find insertion index
function arrayFindInsertIndex<T>(array: T[], ele: T, comp: (a: T, b: T) => number) {
    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
        const i = (low + high) >> 1;
        const c = comp(array[i], ele);

        if (c < 0) {
            low = i + 1;
        } else if (c > 0) {
            high = i - 1;
        } else {
            return i;
        }
    }

    return low;
}

export function arrayInsertSorted<T>(array: T[], ele: T, comp: (a: T, b: T) => number) {
    const idx = arrayFindInsertIndex(array, ele, comp);

    array.splice(idx, 0, ele);

    return idx;
}
