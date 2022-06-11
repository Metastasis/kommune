import React from 'react';
import Head from 'next/head';
import styles from './PageDefault.module.css';
import {Header, MenuItem} from './Header';
import {Footer} from './Footer';
import {useRouter} from 'next/router';
import {useAuth} from '@features/auth';

export const PageDefault: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
  const router = useRouter();
  const auth = useAuth();
  const authorized = Boolean(auth.session)
  React.useEffect(() => {
    if (router.pathname !== '/' && !authorized) {
      router.push('/')
    }
  }, [auth, router]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Kommune</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header menu={buildMenu({authorized})} />

      <main className={styles.main}>
        {children}
      </main>

      <Footer />
    </div>
  );
}

function buildMenu({authorized}: {authorized: boolean}): MenuItem[] {
  let items: MenuItem[] = [];
  if (authorized) {
    items = [
      ...items,
      {href: '/calculations', title: 'Расчеты'}
    ];
  }
  return items
}
