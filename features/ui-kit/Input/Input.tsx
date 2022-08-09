import React, {ChangeEventHandler, FocusEventHandler} from 'react';
import styles from './Input.module.css';


type Props = {
  name: string,
  label: string,
  value?: string,
  onChange: (value: string, event: Pick<InputEvent, 'target' | 'type'>) => void
  onBlur?: FocusEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
};

export default React.forwardRef<HTMLInputElement, Props>(function Input(props, ref) {
  const { name, label, value, onChange, onFocus, onBlur } = props;
  const handleChange: ChangeEventHandler<HTMLInputElement> = React.useCallback((event) => {
    onChange(event.target.value, event)
  }, [onChange])
  return (
    <div className={`${styles.root} ${styles.L}`}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        ref={ref}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  )
});
