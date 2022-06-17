import React from 'react';
import styles from './Field.module.css';


interface Props {
  error?: string
}

const Field: React.FC<React.PropsWithChildren<Props>> = ({ error, children }) => {
  return (
    <div className={styles.root}>
      <div>{children}</div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
};

export default Field;
