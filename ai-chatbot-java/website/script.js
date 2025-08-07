document.addEventListener("DOMContentLoaded", function() {
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const chatBox = document.getElementById("chat-box");

    chatForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const userMessage = chatInput.value;
        if (userMessage.trim() === "") return;

        appendMessage("User", userMessage);
        chatInput.value = "";

        fetch("http://localhost:8080/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            appendMessage("Bot", data.reply);
        })
        .catch(error => {
            console.error("Error:", error);
            appendMessage("Bot", "Sorry, something went wrong.");
        });
    });

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.classList.add(sender.toLowerCase());
        messageElement.textContent = `${sender}: ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }
});