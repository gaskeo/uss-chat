import {createRoom} from "./createRoom";

function selectRoom(roomId?: string) {
    if (!roomId) {
        roomId = createRoom();
    }
    sessionStorage.setItem("room", roomId);
}

export {selectRoom};
