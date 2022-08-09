import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './Checkbox.module.css';


type Props = {
  id?: string,
  label: string,
  value: string
} & ReturnType<UseFormRegister<{[key: string]: unknown}>>;

export default React.forwardRef<HTMLInputElement, Props>(function Checkbox(props, ref) {
  const {id, value, label, name, onChange, onBlur} = props;
  return (
    <div className={styles.root}>
      <input
        type="checkbox"
        id={id}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
});
