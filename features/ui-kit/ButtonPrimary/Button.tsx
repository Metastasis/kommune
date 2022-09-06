import React from 'react';
import styles from './Button.module.css';


interface Props {
  type: 'submit' | 'button',
  disabled?: boolean
}

const Button: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const {type = 'button', children, disabled} = props;
  return (
    <button
      className={`${styles.root} ${styles.L}`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
};

export default Button;
