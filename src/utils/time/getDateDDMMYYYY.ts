const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
]

function getDateDDMMYYYY(date: Date, needYear = true) {
    if (!needYear) return `${date.getDate()} ${months[date.getMonth()]}`;

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export {getDateDDMMYYYY};
