# General Purpose AI Chatbot with Web Interface in Java

## Overview
This project implements a modular AI chatbot using Java, which interacts with users through a modern web interface. The chatbot utilizes natural language processing (NLP) techniques to understand user input and generate appropriate responses.

## Project Structure
```
ai-chatbot-java
├── src
│   ├── Main.java
│   ├── NLPProcessor.java
│   ├── IntentMatcher.java
│   ├── ResponseGenerator.java
│   ├── Server.java
│   └── utils
│       └── TextPreprocessor.java
├── data
│   ├── intents.json
│   └── fallback_responses.txt
├── website
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```

## Features
- User-friendly web interface for chatting with the bot.
- NLP-based intent recognition and response generation.
- Modular architecture allowing easy updates and enhancements.
- REST API for communication between frontend and backend.
- Fallback responses for unmatched intents.

## Setup Instructions
1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd ai-chatbot-java
   ```

2. **Build the project:**
   Ensure you have Java 17+ installed. Use your preferred build tool (e.g., Maven, Gradle) to build the project.

3. **Run the server:**
   Execute the `Main.java` file to start the embedded server. The server will listen for incoming requests from the web interface.

4. **Access the chatbot:**
   Open `website/index.html` in a web browser to interact with the chatbot.

## Usage
- Type your message in the input box and press "Send" to communicate with the chatbot.
- The chatbot will respond based on predefined intents and fallback responses.

## Contribution
Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.