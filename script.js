document.getElementById('send-button').addEventListener('click', sendMessage);

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;

    if (message.trim() === '') {
        return;
    }

    fetch('http://localhost:3000/messages', {
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
    fetch('http://localhost:3000/messages')
        .then(response => response.json())
        .then(data => {
            data.messages.forEach(displayMessage);
        })
        .catch(error => console.error('Error:', error));
}

fetchMessages();