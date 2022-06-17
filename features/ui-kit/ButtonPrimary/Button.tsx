import React from 'react';
import styles from './Button.module.css';


interface Props {
  type: 'submit' | 'button'
}

const Button: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const {type = 'button', children} = props;
  return <button className={`${styles.root} ${styles.L}`} type={type}>{children}</button>
};

export default Button;
