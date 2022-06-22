import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './Checkbox.module.css';


type Props = {
  label: string
  id: string
} & ReturnType<UseFormRegister<{[key: string]: unknown}>>;

// eslint-disable-next-line react/display-name
const Checkbox = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {id, name, label, onChange, onBlur} = props;
  return (
    <div className={styles.root}>
      <input
        type="checkbox"
        id={id}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
});

export default Checkbox;
