import {Event} from "../models";
import {getRoomEvents} from "./getRoomEvents";
import {setEvents} from "./setEvents";

function addEvent(roomId: string, event: Event) {
    const events = getRoomEvents(roomId);
    events.push(event);
    setEvents(roomId, events);
}

export {addEvent};
