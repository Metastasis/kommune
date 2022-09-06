import React, {
  ChangeEvent,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEvent,
} from 'react';
import styles from './Autocomplete.module.css';

interface Suggestion<T = any> {
  text: string,
  value: string,
  data?: T
}
interface Props {
  name: string,
  label: string,
  value: string
  suggestions: Array<Suggestion>,
  onChange: (ev: any) => void
  onSelect: (item: Suggestion | '') => void
  onBlur?: FocusEventHandler<HTMLInputElement>
  disabled?: boolean
}

const AutocompleteControlled = React.forwardRef<HTMLInputElement, Props>(function Autocomplete(props, ref) {
  const {suggestions, name, value, disabled, onChange, onSelect, onBlur} = props;
  // The active selection's index
  const [activeSuggestion, setActiveSuggestion] = React.useState(0)
  // The suggestions that match the user's input
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<Props['suggestions']>([])
  // Whether the suggestion list is shown
  const [showSuggestions, setShowSuggestions] = React.useState(false)
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
    onChange((e as any).currentTarget.value)
  }, [onChange, suggestions]);
  const handleClick: (e: MouseEvent<HTMLLIElement>, s: Suggestion) => void = React.useCallback((e, suggestion) => {
    setActiveSuggestion(0)
    setFilteredSuggestions([])
    setShowSuggestions(false)
    onChange(suggestion.text)
    onSelect(suggestion)
  }, [onSelect, setActiveSuggestion, setFilteredSuggestions, setShowSuggestions, onChange]);
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = React.useCallback((e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setActiveSuggestion(0)
      setShowSuggestions(false)
      onChange(filteredSuggestions[activeSuggestion].text)
      onSelect(filteredSuggestions[activeSuggestion])
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      setActiveSuggestion(Math.max(activeSuggestion - 1, 0))
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      setActiveSuggestion(Math.min(activeSuggestion + 1, filteredSuggestions.length - 1))
    }
  }, [onSelect, activeSuggestion, filteredSuggestions, setActiveSuggestion, setShowSuggestions, onChange]);
  let suggestionsListComponent;
  if (showSuggestions && value && !disabled) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className={styles.suggestions}>
          {filteredSuggestions.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = styles.active;
            }

            return (
              <li className={className} key={suggestion.value} onClick={(e) => handleClick(e, suggestion)}>
                {suggestion.text}
              </li>
            );
          })}
        </ul>
      );
    } else if (!disabled) {
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
        onBlur={onBlur}
        value={value}
        disabled={disabled}
      />
      {suggestionsListComponent}
    </>
  )
})


export default AutocompleteControlled;
