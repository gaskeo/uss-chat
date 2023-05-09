function isDatesEqual(first: Date, second: Date) {
    return Boolean(
        first.getDate() === second.getDate() &&
        first.getMonth() === second.getMonth() &&
        first.getFullYear() === second.getFullYear()
    )
}

export {isDatesEqual};
