async function getImage(name: string): Promise<string | undefined> {
    const request = indexedDB.open("localChat", 3);

    request.onerror = (event) => {
        console.log(event);
        return new Promise((r, reject) => reject(event));
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
        request.onerror = event => reject(event);
    })
}

export {getImage};
