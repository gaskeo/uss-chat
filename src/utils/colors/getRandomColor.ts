function getRandomHex() {
    return Math.round(Math.random() / 4 * 1000).toString(16).padStart(2, "0")
}

function getRandomColor() {
    const [r, g, b] = [getRandomHex(), getRandomHex(), getRandomHex()];
    console.log(r, g, b)
    return `#${r}${g}${b}`
}

export {getRandomColor};