import { setupWorker } from 'msw'
import { mockHandlers } from '@features/calculation'
import { mockHandlers as servicesMockHandlers } from '@features/services'

let worker = null;

if (typeof window !== 'undefined') {
  // This configures a Service Worker with the given request handlers.
  worker = setupWorker(...mockHandlers, ...servicesMockHandlers);
}

export {worker};
