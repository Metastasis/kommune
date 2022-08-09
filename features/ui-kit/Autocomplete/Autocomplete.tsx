import React, {FocusEventHandler} from 'react';
import FormInput from '../FormInput';
import styles from './Autocomplete.module.css';
import {ChangeHandler, UseFormRegister} from 'react-hook-form';


export interface SelectItem {
  value: string
  text: string
}

interface P {
  name: string
  inputValue?: string
  items: SelectItem[]
  label: string
  onChange: ChangeHandler
  onBlur: ChangeHandler
  onSelect?: (item: SelectItem | null) => void
  loading?: boolean
}

type Props = P & ReturnType<UseFormRegister<{[key: string]: unknown}>>
export default React.forwardRef<HTMLInputElement, Props>(function Autocomplete(props, ref) {
  const {
    name,
    // inputValue,
    items,
    loading,
    label,
    onChange,
    onBlur,
    onSelect,
  } = props
  const [opened, setOpened] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const onFocus = () => {
    if (!opened && items.length && !loading) {
      setOpened(true)
    }
    setFocused(true)
  }
  const onChangeBlur: FocusEventHandler<HTMLElement> = (event) => {
    // if (onSelect && !items.find(item => item.text === inputValue)) {
    //   onSelect(null)
    // }
    if (!rootRef.current?.contains(event.relatedTarget) && opened) {
      setFocused(false)
      setOpened(false)
    }
  }
  const onSelectItem = (selectedItem: SelectItem) => {
    const input = rootRef.current?.querySelector('input')
    if (input && input.value !== selectedItem.text) {
      input.value = selectedItem.text
      const changeEvent = new Event('input', {cancelable: true, bubbles: true})
      changeEvent.value = 
      input.dispatchEvent(changeEvent)
      onChange(selectedItem.text)
    }
    if (onSelect) onSelect(selectedItem)
    setOpened(false);
  }
  return (
    <div ref={rootRef} className={styles.root} onBlur={onChangeBlur}>
      <FormInput
        ref={ref}
        name={name}
        label={label}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {opened && (
        <div className={styles.dropdown}>
          {items.map(item => (
            <div
              key={item.value}
              className={styles.dropdownItem}
              onClick={() => onSelectItem(item)}
              tabIndex={0}
            >
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
})
