import React from 'react';
import type { AppProps } from 'next/app';
import {AuthProvider} from '@features/auth';
import {PageDefault} from '@features/layout';
import {MockManager, Mock} from '@features/mock';
import '../styles/fonts.css';
import '../styles/globals.css';
import '../styles/typography.css';
import '../styles/focus-ring-reset.css';


let mockManager: MockManager | null = null;
if (MockManager.isAvailable()) {
  mockManager = new MockManager();
}

if (typeof window !== 'undefined') {
  const DKU = require('detect-keyboard-user');
  new DKU();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <PageDefault>
        <Component {...pageProps} />
        {mockManager && <Mock mockManager={mockManager} />}
      </PageDefault>
    </AuthProvider>
  );
}

export default MyApp;
