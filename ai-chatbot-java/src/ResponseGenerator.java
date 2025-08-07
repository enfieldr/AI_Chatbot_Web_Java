import java.util.List;
import java.util.Map;

public class ResponseGenerator {

    private Map<String, List<String>> intents;
    private List<String> fallbackResponses;

    public ResponseGenerator(Map<String, List<String>> intents, List<String> fallbackResponses) {
        this.intents = intents;
        this.fallbackResponses = fallbackResponses;
    }

    public String generateResponse(String intent) {
        if (intents.containsKey(intent)) {
            List<String> responses = intents.get(intent);
            return getRandomResponse(responses);
        } else {
            return getFallbackResponse();
        }
    }

    private String getRandomResponse(List<String> responses) {
        int index = (int) (Math.random() * responses.size());
        return responses.get(index);
    }

    private String getFallbackResponse() {
        int index = (int) (Math.random() * fallbackResponses.size());
        return fallbackResponses.get(index);
    }
}