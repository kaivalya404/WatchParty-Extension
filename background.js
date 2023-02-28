const socket = new WebSocket('ws://localhost:3000');

function keepAlive() {
    const messageJson = { browser: "chrome", pathid : "keep-alive" };
    const message = JSON.stringify(messageJson);
    socket.send(message);
    console.log("Keep-alive action executed.");
}

const interval = 20000; // 20 seconds
const timerId = setInterval(keepAlive, interval);

socket.addEventListener('open', function (event) {
    console.log('Connected to WS Server');
});

socket.addEventListener('message', function (event) {
    const message = JSON.parse(event.data);
    console.log(message);
    if (message.pathid === 'keep-alive') {
        console.log('Received keep-alive message');
    }
    else if (message.pathid === 'sync') {
        chrome.tabs.query({ active: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message);
        });
    }else if (message.pathid === "joinParty"){
        chrome.tabs.query({ active: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message);
        });
    }else if (message.pathid === "createParty"){
        chrome.tabs.query({ active: true }, function(tabs) {
            console.log(message);
            chrome.tabs.sendMessage(tabs[0].id, message);
        });
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.pathid === 'createParty') {
        const messageJson = { browser: "chrome", group: request.group, pathid: "createParty", username: request.username, url: request.url };
        const message = JSON.stringify(messageJson);
        socket.send(message);
        console.log("Party created");
        messageJson = { browser: "chrome", group: request.group, pathid: "joinParty", username: request.username };
        message = JSON.stringify(messageJson);
        socket.send(message);
        sendResponse({ info: 'Party created', success: true });
    } else if (request.pathid === 'joinParty') {

        const messageJson = { browser: "chrome", group: request.group, pathid: "joinParty", username: request.username };
        const message = JSON.stringify(messageJson);
        socket.send(message);
        sendResponse({ info: 'Joined party', success: true});

    }else if (request.pathid === 'sync') {
        const messageJson = { browser: "chrome", group: request.group, pathid: "sync", signal: request.signal, t: request.t };
        const message = JSON.stringify(messageJson);
        socket.send(message);

    }
});// Commit 1
// Commit 2
// Commit 3
