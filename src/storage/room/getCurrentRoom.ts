function getCurrentRoom() {
    const currentRoomString = sessionStorage.getItem("room");
    if (!currentRoomString) {
        return null;
    }
    return JSON.parse(currentRoomString).toString();
}
export {getCurrentRoom};
