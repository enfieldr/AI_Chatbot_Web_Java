import java.nio.file.*;
import java.util.*;
import com.google.gson.*;

public class Main {
    public static void main(String[] args) throws Exception {
        String intentsJson = Files.readString(Paths.get("ai-chatbot-java/data/intents.json"));
        Gson gson = new Gson();
        JsonObject obj = gson.fromJson(intentsJson, JsonObject.class);

        Map<String, IntentMatcher.Intent> intents = new HashMap<>();
        for (String key : obj.keySet()) {
            JsonObject intentObj = obj.getAsJsonObject(key);
            List<String> patterns = new ArrayList<>();
            for (JsonElement el : intentObj.getAsJsonArray("patterns")) {
                patterns.add(TextPreprocessor.preprocess(el.getAsString()));
            }
            List<String> responses = new ArrayList<>();
            for (JsonElement el : intentObj.getAsJsonArray("responses")) {
                responses.add(el.getAsString());
            }
            intents.put(key, new IntentMatcher.Intent(patterns, responses));
        }

        List<String> fallbackResponses = Files.readAllLines(Paths.get("ai-chatbot-java/data/fallback_responses.txt"));

        IntentMatcher matcher = new IntentMatcher(intents, fallbackResponses);

        Server.start(matcher);
    }
}