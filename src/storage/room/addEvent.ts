import {EventPublic, EventTypes} from "../models";
import {getRoomEvents} from "./getRoomEvents";
import {setEvents} from "./setEvents";
import {generateSalt, isDatesEqual} from "../../utils";
import {getAuthUser} from "../auth/getAuthUser";

function addEvent(roomId: string, event: EventPublic) {
    const currentUser = getAuthUser();
    if (!currentUser) {
        return
    }
    const events = getRoomEvents(roomId);
    if (events.length === 0 || !isDatesEqual(new Date(), new Date(events[events.length - 1].time.toString()))) {
        events.push({
            type: EventTypes.DATE,
            time: Number(new Date()).toString(),
            id: Number(new Date()).toString() + generateSalt(),
        })
    }

    events.push({
        ...event,
        time: Number(new Date()).toString(),
        id: Number(new Date()).toString() + generateSalt(),
        user: currentUser.username
    });
    setEvents(roomId, events);
}

export {addEvent};
