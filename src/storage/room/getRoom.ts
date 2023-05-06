import {getRooms} from "./getRooms";
import {Room} from "../models";

function getRoom(roomId: string): Room | null {
    const room = getRooms().filter(r => r.id === roomId)[0];
    return room !== undefined ? room : null;
}

export {getRoom};