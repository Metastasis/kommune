import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import {LOGIN_URL, REGISTRATION_URL, useAuth} from '@features/auth';

export const Header: React.FC<{}> = () => {
  const auth = useAuth()
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Kommune</Link>
      </div>
      <div className={styles.menu}>
        <Link href="/list">Расчеты</Link>
      </div>
      <div className={styles.profile}>
        {auth.session ? <a href={auth.logoutUrl}>Выйти</a> : <a href={LOGIN_URL}>Войти</a>}
        {!auth.session && '/'}
        {!auth.session && <a href={REGISTRATION_URL}>Регистрация</a>}
      </div>
    </div>
  );
}
