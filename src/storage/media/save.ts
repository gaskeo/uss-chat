import {generateSalt} from "../../utils";

// @ts-ignore
const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;

function init() {
    const request = indexedDB.open("localChat",  3);
    request.onerror = (event) => {
        console.log(event);
    }

    request.onupgradeneeded = () => {
        const db = request.result;
        const store = db.createObjectStore("images", {keyPath: "id"});
        store.createIndex("data", ["data"], {unique: false});
    }
}

async function loadImage(image: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const fileName = generateSalt()

        const reader = new FileReader();
        reader.addEventListener("load", function () {
            const request = indexedDB.open("localChat",  3);
            request.onerror = (event) => {
                console.log(event);
            }
            request.onsuccess = () => {
                const db = request.result;
                const transaction = db.transaction("images", "readwrite");
                const store = transaction.objectStore("images");
                console.log(fileName, reader.result)
                const putRequest = store.put({id: fileName, data: reader.result});
                putRequest.onsuccess = () => resolve(fileName);
            }
        })
        reader.readAsDataURL(image);
    })
}

async function getImage(name: string): Promise<string | undefined> {
    console.log(name)

    const request = indexedDB.open("localChat",  3);
    console.log(name)

    request.onerror = (event) => {
        console.log(event);
    }


    return await new Promise((resolve, reject) => {
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction("images", "readonly");
            const store = transaction.objectStore("images");
            const getRequest = store.get(name);
            getRequest.onsuccess = () => {
                resolve(getRequest?.result?.data);
            }
        }

    })
}

export {init, loadImage, getImage};