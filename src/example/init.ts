import {catImage} from "./catImage";

function addExampleImage() {
    const request = indexedDB.open("localChat", 3);
    request.onerror = (event) => {
        console.log(event);
    }
    request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction("images", "readwrite");
        const store = transaction.objectStore("images");
        store.put(catImage);
    }
}

function addExampleUsers() {
    localStorage.setItem("user_user134141", JSON.stringify({
        name: "Вася",
        password: "********",
        salt: "********",
        username: "user134141",
        color: "#f6aa1c"
    }));

    localStorage.setItem("user_user134142", JSON.stringify({
        name: "Иван",
        password: "********",
        salt: "********",
        username: "user134142",
        color: "#669bbc"
    }));

    localStorage.setItem("user_user134143", JSON.stringify({
        name: "Катя",
        password: "********",
        salt: "********",
        username: "user134143",
        color: "#f4d58d"
    }));
}

function addExampleRoom() {
    const existRooms = JSON.parse(localStorage.getItem("rooms") || "[]");
    localStorage.setItem("rooms", JSON.stringify(
        Array.from(new Set([...existRooms, {
            id: "12345678",
            name: "Cool example room",
            users: ["user134141", "user134142", "user134143"]
        }]))
    ))
}

function addExampleEvents() {
    localStorage.setItem("events_12345678", JSON.stringify([
        {
            "type": 3,
            "time": "1682922184000",
            "id": "16836367533963926812884"
        },
        {
            "type": 0,
            "time": "1682922184000",
            "id": "1683636153391474103245",
            "user": "user134141"
        },
        {
            "type": 1,
            "message": "Как же свежо в новой комнате",
            "time": "1682922304000",
            "id": "16836371105334657637156",
            "user": "user134141"
        },
        {
            "type": 0,
            "time": "1682922424000",
            "id": "1683636752352974103245",
            "user": "user134142"
        },
        {
            "type": 1,
            "message": "Привет, Вася",
            "time": "1682922484000",
            "id": "16836371105303027637156",
            "user": "user134142"
        },
        {
            "type": 1,
            "message": "Привет, Вань!",
            "time": "1682922541000",
            "id": "16833771645363027532116",
            "user": "user134141",
            "replyId": "16836371105303027637156"
        },
        {
            "type": 1,
            "message": "Ого, как ты ответил на моё сообщение?",
            "time": "1682922580000",
            "id": "16836371105303027637156",
            "user": "user134142"
        },
        {
            "type": 1,
            "message": "Да всё просто, просто нажми правой кнопкой мыши по сообщению",
            "time": "1682922654000",
            "id": "16833521521352512552146",
            "user": "user134141",
        },
        {
            "type": 1,
            "message": "Смотри, какой у меня кот! Нажми на него :)",
            "time": "1682922714000",
            "id": "16833521521742622326246",
            "user": "user134141",
            "media": ["5415151251"]
        },
        {
            "type": 1,
            "message": "Какой он милый😍",
            "time": "1682922834000",
            "id": "16833521524151254246246",
            "replyId": "16833521521742622326246",
            "user": "user134142",
        },
        {
            "type": 3,
            "time": "1683095514000",
            "id": "12435325245653623812884"
        },
        {
            "type": 0,
            "time": "1683095514000",
            "id": "5461352632391474103245",
            "user": "user134143"
        },
        {
            "type": 1,
            "message": "Мне сказали, что в этой комнате показывают котов, поэтому я здесь",
            "time": "1683095514000",
            "id": "16833521576256534251245",
            "user": "user134143",
        },
        {
            "type": 1,
            "message": "Добро пожаловать в комнату! Кидайте больше картинок, тут можно добавлять до 5 изображений в одно сообщение!",
            "time": "1683112254000",
            "id": "16833576342365632251245",
            "user": "user134142",
        },
    ]))
}

function init() {
    if (localStorage.getItem("examples")) {
        return;
    }
    addExampleImage();
    addExampleUsers();
    if (!JSON.parse(localStorage.getItem("rooms") || "[]")?.filter((r: {id: string}) => r.id === "12345678")?.length) addExampleRoom();
    addExampleEvents();
    localStorage.setItem("examples", "1")
}

export {init}