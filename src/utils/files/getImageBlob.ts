async function getImageBlob(file: File): Promise<string> {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            resolve(reader.result as string);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    })
}

export {getImageBlob};
