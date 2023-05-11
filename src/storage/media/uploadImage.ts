import {generateSalt} from "../../utils";

export async function uploadImage(image: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const fileName = generateSalt()

        const reader = new FileReader();
        reader.addEventListener("load", function () {
            const request = indexedDB.open("localChat", 3);
            request.onerror = (event) => {
                console.log(event);
            }
            request.onsuccess = () => {
                const db = request.result;
                const transaction = db.transaction("images", "readwrite");
                const store = transaction.objectStore("images");
                const putRequest = store.put({id: fileName, data: reader.result});
                putRequest.onsuccess = () => resolve(fileName);
            }
        })
        reader.readAsDataURL(image);
    })
}
