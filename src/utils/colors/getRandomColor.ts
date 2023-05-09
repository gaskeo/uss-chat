function getRandomHex() {
    return Math.round(Math.random() / 4 * 1000).toString(16).padStart(2, "0")
}

function getRandomColor() {
    const [r, g, b] = [getRandomHex(), getRandomHex(), getRandomHex()];
    return `#${r}${g}${b}`
}

export {getRandomColor};