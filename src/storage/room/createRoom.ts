import {getRooms} from "./getRooms";
import {getAuthUser} from "../auth/getAuthUser";
import {setRooms} from "./setRooms";
import {addEvent} from "./addEvent";
import {EventTypes} from "../models";

function createRoom(name?: string) {
    const authUser = getAuthUser();

    if (!authUser) {
        return "";
    }

    const id = Number(new Date()).toString();
    const rooms = getRooms();
    rooms.push({
        id: id,
        name: name ? name : id,
        users: [authUser.username]
    })
    setRooms(rooms);
    addEvent(id, {
        type: EventTypes.JOIN,
    })
    return id;
}

export {createRoom};