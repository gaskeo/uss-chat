import {Room} from "../models";

function setRooms(rooms: Room[]) {
    localStorage.setItem("rooms", JSON.stringify(rooms));
}

export {setRooms};
