import {getRooms} from "./getRooms";
import {setRooms} from "./setRooms";

function setName(roomId: string, name: string) {
    const rooms = getRooms();
    setRooms(rooms.map(room => (room.id !== roomId ? room : {...room, name: name})));
}

export {setName};
