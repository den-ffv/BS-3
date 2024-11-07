

export const exclude = (obj: object, keys: string[]): object => {
    return Object.fromEntries(Object.entries(obj).filter(([k, _]) => !keys.includes(k)));
}