// @ts-ignore
const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;

export function initIndexedDB() {
    const request = indexedDB.open("localChat", 3);
    request.onerror = (event) => {
        console.log(event);
    }

    request.onupgradeneeded = () => {
        const db = request.result;
        const store = db.createObjectStore("images", {keyPath: "id"});
        store.createIndex("data", ["data"], {unique: false});
    }
}
