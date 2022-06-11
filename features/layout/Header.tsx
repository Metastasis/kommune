import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import {LOGIN_URL, REGISTRATION_URL, useAuth} from '@features/auth';

export interface MenuItem {
  href: string,
  title: string
}

export const Header: React.FC<{menu: MenuItem[]}> = ({menu}) => {
  const auth = useAuth()
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Kommune</Link>
      </div>
      <div className={styles.menu}>
        {menu.map(item => (
          <Link key={item.href} href={item.href}>{item.title}</Link>
        ))}
      </div>
      <div className={styles.profile}>
        {auth.session ? <a href={auth.logoutUrl}>Выйти</a> : <a href={LOGIN_URL}>Войти</a>}
        {!auth.session && '/'}
        {!auth.session && <a href={REGISTRATION_URL}>Регистрация</a>}
      </div>
    </div>
  );
}
