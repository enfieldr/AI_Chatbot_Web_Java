import static spark.Spark.*;

public class Server {
    public static void main(String[] args) {
        // Set the port for the server
        port(4567);

        // Define the endpoint for receiving user messages
        post("/chat", (request, response) -> {
            String userMessage = request.queryParams("message");
            // Process the user message and generate a response
            String botResponse = NLPProcessor.processMessage(userMessage);
            response.type("application/json");
            return "{\"response\": \"" + botResponse + "\"}";
        });

        // Start the server
        System.out.println("Server is running on http://localhost:4567");
    }
}