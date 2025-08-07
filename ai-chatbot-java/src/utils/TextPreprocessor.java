import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

public class TextPreprocessor {
    private static final Pattern PUNCTUATION_PATTERN = Pattern.compile("[\\p{Punct}]");

    public static String preprocess(String input) {
        return normalizeText(removePunctuation(input));
    }

    private static String removePunctuation(String text) {
        return PUNCTUATION_PATTERN.matcher(text).replaceAll("");
    }

    private static String normalizeText(String text) {
        return text.toLowerCase().trim();
    }

    public static List<String> tokenize(String text) {
        return Arrays.asList(text.split("\\s+"));
    }
}