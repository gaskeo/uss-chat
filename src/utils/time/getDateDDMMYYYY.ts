function getDateDDMMYYYY(date: Date, needYear = true) {
    let dateRow = `${date.getDate()} `
    switch (date.getMonth()) {
        case 0:
            dateRow += "января";
            break;
        case 1:
            dateRow += "февраля";
            break;
        case 2:
            dateRow += "марта";
            break;
        case 3:
            dateRow += "апреля";
            break;
        case 4:
            dateRow += "мая";
            break;
        case 5:
            dateRow += "июня";
            break;
        case 6:
            dateRow += "июля";
            break;
        case 7:
            dateRow += "августа";
            break;
        case 8:
            dateRow += "сентября";
            break;
        case 9:
            dateRow += "октября";
            break;
        case 10:
            dateRow += "ноября";
            break;
        case 11:
            dateRow += "декабря";
            break;
    }
    if (!needYear) return dateRow;

    return `${dateRow} ${date.getFullYear()}`;
}

export {getDateDDMMYYYY};
