
document.getElementById('createParty').addEventListener('click', createParty);
document.getElementById('joinParty').addEventListener('click', joinParty);

function createParty() {
    const username = document.getElementById('username').value;
    if (!username) {
        alert('Please enter a username');
        return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const url = tabs[0].url;
        const group = Math.random().toString(36).substring(2, 8); // Generate random code
        chrome.runtime.sendMessage({ pathid: "createParty", username, group, url }, function(response) {
            if (!response.success) {
                alert('Failed to create party.');
            } 
        });
    });
}

function joinParty() {
    const username = document.getElementById('username').value;
    const group = document.getElementById('partyCode').value;
    if (!username || !group) {
        alert('Please enter both username and party code');
        return;
    }
    chrome.runtime.sendMessage({ pathid: "joinParty", username, group }, function(response) {
        if (!response.success) {
            alert('Failed to join party. Please check the party code.');
            
        } 
    });
}// Commit 1
// Commit 2
