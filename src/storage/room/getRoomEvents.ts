import {Event} from "../models";

function getRoomEvents(roomId: string): Event[] {
    const eventsString = localStorage.getItem(`events_${roomId}`)
    if (eventsString) {
        return JSON.parse(eventsString);
    }
    return [];
}

export {getRoomEvents};
