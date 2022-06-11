import React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import {Header, Footer} from '@features/layout'
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
  return (
    <>
      <h1 className={styles.title}>
        Добро пожаловать в <a href="https://kommune.io">Kommune!</a>
      </h1>

      <p className={styles.description}>
        С этим приложением Вы легко сможете рассчитать коммунальные платежи
      </p>
    </>
  )
}

export default Home
