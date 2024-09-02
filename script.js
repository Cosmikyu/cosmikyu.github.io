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
        messageInput.value = '';
        fetchMessages(); // Fetch messages after sending a new one
    })
    .catch(error => {
        console.error('Error:', error);
        showError('The server is currently unavailable. Please try again later.');
    });
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
            const messagesContainer = document.getElementById('messages');
            messagesContainer.innerHTML = ''; // Clear existing messages
            data.messages.forEach(displayMessage);
        })
        .catch(error => {
            console.error('Error:', error);
            showError('The server is currently unavailable. Please try again later.');
        });
}

// Fetch messages every 2 seconds
setInterval(fetchMessages, 2000);

fetchMessages(); // Initial fetch

function showError(errorMessage) {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Clear existing messages
    const errorElement = document.createElement('div');
    errorElement.textContent = errorMessage;
    errorElement.style.color = 'red';
    messagesContainer.appendChild(errorElement);
}