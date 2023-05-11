import {Event} from "../models";

function getEvents(roomId: string): Event[] {
    const eventsString = localStorage.getItem(`events_${roomId}`)
    if (eventsString) {
        return JSON.parse(eventsString);
    }
    return [];
}

export {getEvents};
