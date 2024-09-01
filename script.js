document.getElementById('send-button').addEventListener('click', sendMessage);

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;

    if (message.trim() === '') {
        return;
    }

    fetch('https://uncommon-explicitly-bull.ngrok-free.app/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
        displayMessage(data.message);
        messageInput.value = '';
    })
    .catch(error => console.error('Error:', error));
}

function displayMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function fetchMessages() {
    fetch('https://uncommon-explicitly-bull.ngrok-free.app/api/messages')
        .then(response => response.json())
        .then(data => {
            data.messages.forEach(displayMessage);
        })
        .catch(error => console.error('Error:', error));
}

fetchMessages();