const Flags = {
    dir: './storage',
}

export function setFlag<T extends keyof typeof Flags>(
    key: T,
    val: typeof Flags[T]
) {
    Flags[key] = val
}

export function getFlag(key: keyof typeof Flags) {
    return Flags[key]
}
