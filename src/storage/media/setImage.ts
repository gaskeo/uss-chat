import {generateSalt, getImageBlob} from "../../utils";

export async function setImage(image: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const fileName = generateSalt()

        getImageBlob(image).then(blob => {
            const request = indexedDB.open("localChat", 3);
            request.onerror = (event) => {
                console.log(event);
            }
            request.onsuccess = () => {
                const db = request.result;
                const transaction = db.transaction("images", "readwrite");
                const store = transaction.objectStore("images");
                const putRequest = store.put({id: fileName, data: blob});
                putRequest.onsuccess = () => resolve(fileName);
            }
        })
    })
}
