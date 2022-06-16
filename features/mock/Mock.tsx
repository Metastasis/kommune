import React from 'react';
import MockManager from './MockManager';
import styles from './Mock.module.css';

export default function Mock(props: {mockManager: MockManager}) {
  const {mockManager} = props;
  const [active, setActive] = React.useState(mockManager.enabled);
  const onToggle = React.useCallback(() => {
    const nextActive = !active;
    setActive(nextActive);
    if (nextActive) {
      mockManager.start();
    } else {
      mockManager.stop();
    }
  }, [active, setActive, mockManager]);
  return (
    <div className={styles.root}>
      <form className={styles.form}>
        <input
          type="button"
          onClick={onToggle}
          value={active ? 'Выключить моки' : 'Включить моки'}
        />
      </form>
    </div>
  );
}
