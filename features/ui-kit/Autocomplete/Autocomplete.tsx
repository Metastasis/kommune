import React, {FocusEventHandler} from 'react';
import FormInput from '../FormInput';
import styles from './Autocomplete.module.css';
import {ChangeHandler, UseFormRegister} from 'react-hook-form';


export interface SelectItem<T = undefined> {
  value: string
  text: string
  data?: T
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
    items,
    loading,
    label,
    onChange,
    onBlur,
    onSelect,
  } = props
  const [opened, setOpened] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const onFocus = () => {
    if (!opened && items.length && !loading) {
      setOpened(true)
    }
  }
  const onChangeBlur: FocusEventHandler<HTMLElement> = (event) => {
    if (!rootRef.current?.contains(event.relatedTarget) && opened) {
      setOpened(false)
    }
  }
  const onSelectItem = (selectedItem: SelectItem) => {
    const input = rootRef.current?.querySelector('input')
    if (input && input.value !== selectedItem.text) {
      input.value = selectedItem.text
      const changeEvent = new Event('input', {cancelable: true, bubbles: true}) as any
      changeEvent.value = input.dispatchEvent(changeEvent)
      onChange(selectedItem.text as any)
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
