import React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import {Header, Footer} from '@features/layout'
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kommune</title>
        <meta name="description" content="Kommune calculate communal payments" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Добро пожаловать в <a href="https://kommune.io">Kommune!</a>
        </h1>

        <p className={styles.description}>
          С этим приложением Вы легко сможете рассчитать коммунальные платежи
        </p>
      </main>

      <Footer />
    </div>
  )
}

export default Home
