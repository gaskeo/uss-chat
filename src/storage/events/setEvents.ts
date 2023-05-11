import {Event} from "../models";

function setEvents(roomId: string, events: Event[]) {
    localStorage.setItem(`events_${roomId}`, JSON.stringify(events))
}

export {setEvents};
