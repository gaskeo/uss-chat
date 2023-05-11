import {getRooms} from "./getRooms";
import {getAuthUser} from "../user/getAuthUser";
import {setRooms} from "./setRooms";
import {addEvent} from "../events/addEvent";
import {EventTypes} from "../models";

function addRoom(name?: string) {
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

export {addRoom};