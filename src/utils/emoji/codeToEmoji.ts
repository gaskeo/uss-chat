export function codeToEmoji(code: string): string {
    return String.fromCodePoint(parseInt(code.slice(2),10))
}