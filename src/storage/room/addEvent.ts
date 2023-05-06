import {EventPublic} from "../models";
import {getRoomEvents} from "./getRoomEvents";
import {setEvents} from "./setEvents";
import {generateSalt} from "../../utils";
import {getAuthUser} from "../auth/getAuthUser";

function addEvent(roomId: string, event: EventPublic) {
    const events = getRoomEvents(roomId);
    const currentUser = getAuthUser();
    if (!currentUser) {
        return
    }
    events.push({...event,
        time: Number(new Date()).toString(),
        id: Number(new Date()).toString() + generateSalt(),
        user: currentUser.username
    });
    setEvents(roomId, events);
}

export {addEvent};
