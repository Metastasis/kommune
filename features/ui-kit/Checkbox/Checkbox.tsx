import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './Checkbox.module.css';


type Props = {
  id?: string,
  label: string,
  value: string
} & ReturnType<UseFormRegister<{[key: string]: unknown}>>;

// eslint-disable-next-line react/display-name
const Checkbox = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
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

export default Checkbox;
