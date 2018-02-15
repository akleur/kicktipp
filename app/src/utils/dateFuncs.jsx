function addZero(j) {
    let i = j;
    if (i < 10) {
        i = `0${i}`;
    }
    return i;
}

function getDateFormated(dateString) {
    const dateToRender = new Date(dateString);
    const day = dateToRender.getDate();
    const month = dateToRender.getMonth() + 1;
    const year = dateToRender.getFullYear();

    return `${addZero(day)}.${addZero(month)}.${year}`;
}

function getTimeFormated(dateString) {
    const dateToRender = new Date(dateString);
    const hours = dateToRender.getHours();
    const minutes = dateToRender.getMinutes();

    return `${hours}:${addZero(minutes)}`;
}

export function getDate(dateString) {
    return getDateFormated(dateString);
}

export function getTime(dateString) {
    return getTimeFormated(dateString);
}

export function getFullDate(dateString) {
    return `${getDateFormated(dateString)} ${getTimeFormated(dateString)}`;
}
