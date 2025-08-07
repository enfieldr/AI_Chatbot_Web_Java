import java.util.List;
import java.util.Map;
import java.util.HashMap;

public class IntentMatcher {
    private Map<String, Intent> intents;

    public IntentMatcher(Map<String, Intent> intents) {
        this.intents = intents;
    }

    public String matchIntent(String userInput) {
        for (Map.Entry<String, Intent> entry : intents.entrySet()) {
            Intent intent = entry.getValue();
            for (String pattern : intent.getPatterns()) {
                if (userInput.matches(".*" + pattern + ".*")) {
                    return intent.getResponses().get(0); // Return the first response for simplicity
                }
            }
        }
        return null; // No match found
    }

    public static class Intent {
        private List<String> patterns;
        private List<String> responses;

        public Intent(List<String> patterns, List<String> responses) {
            this.patterns = patterns;
            this.responses = responses;
        }

        public List<String> getPatterns() {
            return patterns;
        }

        public List<String> getResponses() {
            return responses;
        }
    }
}