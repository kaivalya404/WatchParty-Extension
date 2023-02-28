var k = document.getElementsByTagName("video");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.pathid === "createParty") {
        console.log(request);
        localStorage.setItem('group', request.group); // Set localStorage for group
        alert(`(through content) Party created! Your party code is: ${request.group}`);
        sendResponse({ info: 'Alert displayed' });
    }
    else if (request.pathid === "joinParty") {
        console.log(request);
        localStorage.setItem('group', request.group); // Set localStorage for group
        alert(`(through content) Party joined! Your party code is: ${request.url}`);
        sendResponse({ info: 'Alert displayed' });
    }
    else if (request.pathid === "sync" && k.length > 0) {
        if (request.signal == "pause") {
            k[0].pause();
        }
        if (request.signal == "play") {
            k[0].currentTime = parseFloat(request.t);
            k[0].play();
        }
    }
});

if (k.length > 0) {
    k[0].addEventListener("pause", (event) => {
        console.log("paused");
        chrome.runtime.sendMessage({ pathid: "sync", signal: "pause", group: localStorage.getItem('group') }, function(response) {
            console.log(response.info);
        });
    });

    k[0].addEventListener("play", (event) => {
        console.log("played");
        console.log(k[0].currentTime);
        chrome.runtime.sendMessage({ pathid: "sync", signal: "play", t: k[0].currentTime, group: localStorage.getItem('group') }, function(response) {
            console.log(response.info);
        });
    });
}// Commit 1
// Commit 2
// Commit 3
// Commit 4
// Commit 5
// Commit 6
// Commit 7
// Commit 8
// Commit 9
