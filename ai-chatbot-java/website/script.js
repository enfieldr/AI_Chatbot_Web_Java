const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const loading = document.getElementById('loading');

function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    const bubbleDiv = document.createElement('div');
    bubbleDiv.classList.add('bubble', sender);
    bubbleDiv.textContent = text;

    const timestampDiv = document.createElement('div');
    timestampDiv.classList.add('timestamp');
    timestampDiv.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    messageDiv.appendChild(bubbleDiv);
    messageDiv.appendChild(timestampDiv);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function setLoading(show) {
    loading.style.display = show ? 'flex' : 'none';
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    appendMessage('user', message);
    userInput.value = '';
    setLoading(true);

    try {
        const response = await fetch('http://localhost:4567/chat', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({message})
        });
        const data = await response.json();
        setLoading(false);
        appendMessage('bot', data.reply);
    } catch (error) {
        setLoading(false);
        appendMessage('bot', "Sorry, I couldn't connect to the server.");
    }
}

sendButton.onclick = sendMessage;
userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') sendMessage();
});

// Welcome message
window.onload = function() {
    appendMessage('bot', "Hello! 👋 I'm your AI chatbot. How can I help you today?");
};