import static spark.Spark.*;
import com.google.gson.*;

public class Server {
    public static void start(IntentMatcher matcher) {
        port(4567);
        post("/chat", (req, res) -> {
            res.type("application/json");
            JsonObject reqJson = JsonParser.parseString(req.body()).getAsJsonObject();
            String userMessage = reqJson.get("message").getAsString();
            String reply = matcher.matchIntent(userMessage);
            JsonObject respJson = new JsonObject();
            respJson.addProperty("reply", ResponseGenerator.generate(reply));
            return respJson.toString();
        });
    }
}