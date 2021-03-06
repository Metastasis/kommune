import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './Input.module.css';


type Props = {
  label: string
} & ReturnType<UseFormRegister<{[key: string]: unknown}>>;

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { name, label, onChange, onBlur } = props;
  return (
    <div className={`${styles.root} ${styles.L}`}>
      <label className={styles.label}>{label}</label>
      <input className={styles.input} ref={ref} name={name} onChange={onChange} onBlur={onBlur} />
    </div>
  )
});

export default Input;
