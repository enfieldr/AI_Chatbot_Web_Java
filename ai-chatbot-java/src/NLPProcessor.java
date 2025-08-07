public class NLPProcessor {
    
    private IntentMatcher intentMatcher;
    private ResponseGenerator responseGenerator;

    public NLPProcessor(IntentMatcher intentMatcher, ResponseGenerator responseGenerator) {
        this.intentMatcher = intentMatcher;
        this.responseGenerator = responseGenerator;
    }

    public String processInput(String userInput) {
        String normalizedInput = normalizeInput(userInput);
        String intent = intentMatcher.matchIntent(normalizedInput);
        return responseGenerator.generateResponse(intent);
    }

    private String normalizeInput(String input) {
        TextPreprocessor preprocessor = new TextPreprocessor();
        return preprocessor.preprocess(input);
    }
}