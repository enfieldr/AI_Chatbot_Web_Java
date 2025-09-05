// ------------------- Chatbot Data -------------------
const intents = [
    { tag: "greeting", patterns: ["hi", "hello", "hey", "good morning", "good evening"], responses: ["Hello! How can I assist you today?", "Hi there! What can I do for you?", "Hey! Need any help?"] },
    { tag: "goodbye", patterns: ["bye", "see you later", "goodbye", "catch you later"], responses: ["Goodbye! Have a great day!", "See you later! Stay safe.", "Bye! Come back soon."] },
    { tag: "thanks", patterns: ["thanks", "thank you", "thanks a lot", "thanks for helping"], responses: ["You're welcome!", "No problem!", "Anytime! Happy to help."] },
    { tag: "weather", patterns: ["what's the weather like?", "tell me the weather", "weather today"], responses: ["I can't check real-time weather yet, but it’s always sunny in code land 🌞", "I hope the weather is great where you are!"] },
    { tag: "jokes", patterns: ["tell me a joke", "make me laugh", "do you know a joke?"], responses: ["Why don’t programmers like nature? Too many bugs 🐛😂", "I would tell you a UDP joke, but you might not get it."] },
    { tag: "programming_help", patterns: ["i need programming help", "help me with code", "code problem"], responses: ["Sure! What language are you using?", "I can help with code. Please describe your problem."] },
    { tag: "general_info", patterns: ["who are you?", "what can you do?", "introduce yourself"], responses: ["I'm your friendly AI assistant, here to help with coding, questions, or just chatting!", "I can answer questions, tell jokes, or assist with programming."] },
    { tag: "math_help", patterns: ["solve 2+2", "math question", "i need help with math"], responses: ["2+2 equals 4", "Sure, what math problem are you trying to solve?"] },
    { tag: "time", patterns: ["what time is it?", "current time", "tell me the time"], responses: ["I can't access real-time clock, but you can check your device!", "Time flies, doesn't it?"] },
    { tag: "date", patterns: ["what's the date today?", "current date", "tell me today's date"], responses: ["Check your device for the current date.", "Today's date is available on your device."] },
    { tag: "movies", patterns: ["recommend a movie", "movie suggestions", "i want to watch a film"], responses: ["I recommend watching Inception!", "Try The Matrix for a classic sci-fi experience."] },
    { tag: "music", patterns: ["play music", "recommend a song", "favorite music"], responses: ["I like all genres of code beats!", "Try listening to Lo-Fi Chill music while coding."] },
    { tag: "sports", patterns: ["latest sports news", "who won the game?", "sports update"], responses: ["I can't fetch live scores, but sports are always exciting!", "Which sport are you following?"] },
    { tag: "news", patterns: ["today's news", "current events", "news update"], responses: ["I can't access live news yet, but check your favorite news site!", "News keeps changing fast; stay updated online."] },
    { tag: "travel", patterns: ["best travel destinations", "where should I travel?", "travel advice"], responses: ["Paris and Tokyo are amazing to visit!", "I recommend exploring nature spots around you."] },
    { tag: "food", patterns: ["suggest food", "what should I eat?", "favorite dish"], responses: ["How about trying pasta today?", "Pizza is always a safe choice! 🍕"] },
    { tag: "health", patterns: ["health tips", "how to stay healthy?", "fitness advice"], responses: ["Drink water and exercise regularly.", "Balanced diet and sleep are key for health."] },
    { tag: "coding_languages", patterns: ["best programming language", "should I learn python?", "which language is easiest?", "java or python", "c++ vs java"], responses: ["Python is beginner-friendly and powerful!", "Java is robust for large applications."] },
    { tag: "ai", patterns: ["what is ai?", "explain artificial intelligence", "ai concepts", "machine intelligence"], responses: ["AI stands for Artificial Intelligence, which allows machines to mimic human intelligence.", "AI can analyze data, make predictions, and learn patterns."] },
    { tag: "machine_learning", patterns: ["what is ml?", "explain machine learning", "ml vs ai", "ml algorithms"], responses: ["ML is a subset of AI focusing on learning from data.", "AI is broader, ML is one way to achieve AI."] },
    { tag: "history", patterns: ["tell me history", "important historical events", "history facts", "ancient history"], responses: ["The Internet was invented in the late 20th century.", "World War II ended in 1945."] },
    { tag: "geography", patterns: ["capital of france?", "largest country?", "geography quiz", "countries and capitals"], responses: ["Capital of France is Paris.", "Russia is the largest country by area."] },
    { tag: "science", patterns: ["science facts", "explain physics", "chemistry question", "biology info"], responses: ["Water boils at 100°C at sea level.", "Newton's laws explain motion and forces."] },
    { tag: "technology", patterns: ["latest tech", "tech news", "innovations", "new gadgets"], responses: ["Technology evolves rapidly with AI and robotics.", "Smart devices make life easier every day."] },
    { tag: "fun_facts", patterns: ["tell me a fun fact", "interesting fact", "random trivia", "did you know"], responses: ["Octopuses have three hearts!", "Bananas are berries, but strawberries are not."] },
    { tag: "career_advice", patterns: ["career tips", "job advice", "resume help", "interview tips"], responses: ["Always keep learning new skills!", "Networking is crucial for career growth."] },
    { tag: "study_tips", patterns: ["how to study", "study advice", "best way to learn", "exam preparation"], responses: ["Take short breaks during study sessions.", "Practice active recall for better retention."] },
    { tag: "finance", patterns: ["saving tips", "investing advice", "budgeting help", "financial planning"], responses: ["Track your expenses monthly.", "Invest early to benefit from compounding."] },
    { tag: "relationships", patterns: ["relationship advice", "friendship tips", "love tips"], responses: ["Communication is key in every relationship.", "Always listen actively."] },
    { tag: "productivity", patterns: ["be productive", "time management", "get work done"], responses: ["Use the Pomodoro technique to stay focused.", "Prioritize tasks daily for efficiency."] },
    { tag: "coding_challenges", patterns: ["code challenge", "practice problem", "programming exercise"], responses: ["Try solving small problems daily.", "LeetCode and HackerRank are good for practice."] },
    { tag: "pets", patterns: ["pet care", "dog advice", "cat tips"], responses: ["Feed pets nutritious food and keep them hydrated.", "Regular vet visits are important."] },
    { tag: "motivation", patterns: ["motivational quote", "inspire me", "encouragement"], responses: ["Believe you can, and you're halfway there.", "Every day is a new opportunity!"] },
    { tag: "hobbies", patterns: ["hobby ideas", "fun activities", "what to do in free time"], responses: ["Try painting, reading, or coding as hobbies.", "Learn a musical instrument!"] },
    { tag: "books", patterns: ["book recommendations", "what to read", "good books"], responses: ["Try reading 'Atomic Habits' by James Clear.", "'Clean Code' is great for programmers."] }
];

// ------------------- Chatbot Logic -------------------
let conversationHistory = [];

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;
    document.getElementById("chat-box").appendChild(msg);
    document.getElementById("chat-box").scrollTop = document.getElementById("chat-box").scrollHeight;
}

function getBotResponse(userMessage) {
    userMessage = userMessage.toLowerCase();
    for (const intent of intents) {
        const { patterns, responses } = intent;
        for (const pattern of patterns) {
            if (userMessage.includes(pattern.toLowerCase())) {
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
    }
    // fallback
    return "I'm not sure I understand. Can you rephrase?";
}

function handleUserInput() {
    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim();
    if (!message) return;
    conversationHistory
}
