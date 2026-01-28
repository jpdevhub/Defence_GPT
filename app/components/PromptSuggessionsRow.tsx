import PromptSuggestionButton from "./promptSuggesionButton"

interface PromptSuggestionsRowProps {
    onPromptClick: (prompt: string) => void;
}

const PromptSuggestionsRow = ({ onPromptClick }: PromptSuggestionsRowProps) => {
    const prompts = [
        "Analyze the current global defense spending trends and their strategic implications",
        "What are the key differences between NATO's Article 5 and other collective defense agreements?",
        "Explain the tactical advantages of multi-domain operations in modern warfare",
        "Compare the defensive capabilities of Iron Dome vs. THAAD missile defense systems"
    ]
    
    return (
        <div className="prompt-suggestion-row">
            {prompts.map((prompt, index) => (
                <PromptSuggestionButton 
                    key={`suggestion-${index}`}
                    text={prompt}
                    onClick={() => onPromptClick(prompt)}
                />
            ))}
        </div>
    )
}

export default PromptSuggestionsRow