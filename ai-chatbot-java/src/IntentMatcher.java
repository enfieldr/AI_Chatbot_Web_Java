import java.util.List;
import java.util.Map;
import java.util.Random;

public class IntentMatcher {
    private Map<String, Intent> intents;
    private List<String> fallbackResponses;

    public IntentMatcher(Map<String, Intent> intents, List<String> fallbackResponses) {
        this.intents = intents;
        this.fallbackResponses = fallbackResponses;
    }

    public String matchIntent(String userInput) {
        String input = NLPProcessor.process(userInput);
        for (Intent intent : intents.values()) {
            for (String pattern : intent.getPatterns()) {
                if (input.contains(pattern.toLowerCase())) {
                    return getRandomResponse(intent.getResponses());
                }
            }
        }
        return getRandomResponse(fallbackResponses);
    }

    private String getRandomResponse(List<String> responses) {
        if (responses == null || responses.isEmpty()) return "Sorry, I didn't understand.";
        Random rand = new Random();
        return responses.get(rand.nextInt(responses.size()));
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