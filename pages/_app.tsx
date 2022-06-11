import React from 'react';
import {SetupWorkerApi} from 'msw';
import type { AppProps } from 'next/app'
import {AuthProvider} from '@features/auth';
import {PageDefault} from '@features/layout'
import '../styles/globals.css'

// TODO: Добавить по кнопке
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && false) {
  const { worker } = require('../mock-browser') as {worker: SetupWorkerApi};
  worker.start({onUnhandledRequest: 'bypass'});
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <PageDefault>
        <Component {...pageProps} />
      </PageDefault>
    </AuthProvider>
  );
}


export default MyApp
