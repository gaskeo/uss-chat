import {createRoom} from "./createRoom";
import {getRoomEvents} from "./getRoomEvents";
import {getRoom} from "./getRoom";
import {getAuthUser} from "../auth/getAuthUser";
import {addEvent} from "./addEvent";
import {EventTypes} from "../models";
import {getRooms} from "./getRooms";
import {setRooms} from "./setRooms";

function selectRoom(roomId?: string) {
    const user = getAuthUser();
    if (!user) {
        return
    }

    if (!roomId) {
        roomId = createRoom();
    }

    const rooms = getRooms();
    const currentRoom = rooms.filter(r => r.id === roomId)[0];
    if (currentRoom) {
        if (!currentRoom.users.includes(user.username)) {
            addEvent(roomId, {
                type: EventTypes.JOIN,
            });
            currentRoom.users.push(user.username);
            setRooms(rooms);
        }
    }

    sessionStorage.setItem("room", roomId);
}

export {selectRoom};
