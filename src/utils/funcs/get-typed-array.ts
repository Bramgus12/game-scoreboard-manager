function getTypedArray<T extends Record<string, string>>(obj: T): Array<T[keyof T]> {
    return Object.values(obj) as T[keyof T][];
}
