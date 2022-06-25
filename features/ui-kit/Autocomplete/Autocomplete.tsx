import React, {FocusEventHandler} from 'react';
import { UseFormRegister } from 'react-hook-form';
import Input from '../Input';
import styles from './Autocomplete.module.css';

interface SelectItem {
  value: string,
  text: string
}

interface Props {
  name: string,
  // inputValue: string
  items: SelectItem[],
  label: string,
  loading?: boolean,
  disabled?: boolean,
  onSelect?: (item: SelectItem) => void,
}

type FormProps = Props & ReturnType<UseFormRegister<{[key: string]: unknown}>>;

// eslint-disable-next-line react/display-name
const Autocomplete = React.forwardRef<HTMLInputElement, FormProps>((props, ref) => {
  const {
    name,
    items,
    loading,
    label,
    disabled,
    onChange,
    onBlur,
    onSelect,
  } = props
  const [focused, setFocused] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const opened = items.length > 0 && focused && !loading
  const onFocus = () => setFocused(true)
  const onChangeBlur: FocusEventHandler<HTMLElement> = (event: any) => {
    if (!rootRef.current?.contains(event.relatedTarget) && opened) {
      setFocused(false)
    }
  }
  const onSelectItem = (selectedItem: SelectItem) => {
    if (onSelect) onSelect(selectedItem)
  }
  return (
    <div ref={rootRef} className={styles.root} onBlur={onChangeBlur}>
      <Input
        ref={ref}
        name={name}
        label={label}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
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

export default Autocomplete
