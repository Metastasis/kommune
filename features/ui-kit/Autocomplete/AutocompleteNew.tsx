import React, {
  ChangeEvent,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';


interface Props {
  name: string,
  label: string,
  suggestions: Array<{text: string, value: string}>,
  onChange: (ev: any) => void
}

const Autocomplete = React.forwardRef<HTMLInputElement, Props>(function Autocomplete(props, ref) {
  const {suggestions, name, onChange} = props;
  // The active selection's index
  const [activeSuggestion, setActiveSuggestion] = React.useState(0)
  // The suggestions that match the user's input
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<Props['suggestions']>([])
  // Whether or not the suggestion list is shown
  const [showSuggestions, setShowSuggestions] = React.useState(false)
  // What the user has entered
  const [userInput, setUserInput] = React.useState('')
  const handleChange = React.useCallback((e: ChangeEvent) => {
    const userInput = (e.currentTarget as any).value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.text.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setActiveSuggestion(0)
    setFilteredSuggestions(filteredSuggestions)
    setShowSuggestions(true)
    setUserInput((e as any).currentTarget.value)
  }, [suggestions]);
  const handleClick: MouseEventHandler<HTMLLIElement> = React.useCallback((e) => {
    setActiveSuggestion(0)
    setFilteredSuggestions([])
    setShowSuggestions(false)
    setUserInput((e as any).currentTarget.innerText)
    const item = suggestions.find(s => s.text === (e as any).currentTarget.innerText)
    if (item) onChange(item.value)
  }, [setActiveSuggestion, setFilteredSuggestions, setShowSuggestions, setUserInput]);
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = React.useCallback((e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setActiveSuggestion(0)
      setShowSuggestions(false)
      setUserInput(filteredSuggestions[activeSuggestion].text)
      onChange(filteredSuggestions[activeSuggestion].value)
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      setActiveSuggestion(activeSuggestion - 1)
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      setActiveSuggestion(activeSuggestion + 1)
    }
  }, [activeSuggestion, filteredSuggestions, setActiveSuggestion, setShowSuggestions, setUserInput]);
  let suggestionsListComponent;
  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }

            return (
              <li className={className} key={suggestion.value} onClick={handleClick}>
                {suggestion.text}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className="no-suggestions">
          <em>No suggestions, you&rsquo;re on your own!</em>
        </div>
      );
    }
  }
  return (
    <>
      <input
        ref={ref}
        name={name}
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={userInput}
      />
      {suggestionsListComponent}
    </>
  )
})


export default Autocomplete;
