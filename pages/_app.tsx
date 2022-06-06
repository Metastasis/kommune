import type { AppProps } from 'next/app'
import {AuthProvider} from '@features/auth'
import '../styles/globals.css'
import {SetupWorkerApi} from 'msw';

// TODO: Добавить по кнопке
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && false) {
  const { worker } = require('../mock-browser') as {worker: SetupWorkerApi};
  worker.start({onUnhandledRequest: 'bypass'});
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
