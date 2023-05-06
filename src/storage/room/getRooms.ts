import {Room} from "../models";

function getRooms() {
    const roomsString = localStorage.getItem("rooms");
    if (!roomsString) {
        return [];
    }
    const rooms: Room[] = JSON.parse(roomsString);
    return rooms;
}

export {getRooms};
