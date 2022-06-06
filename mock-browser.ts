import { setupWorker } from 'msw'
import { mockHandlers } from '@features/tariffs'

let worker = null;

if (typeof window !== 'undefined') {
  // This configures a Service Worker with the given request handlers.
  worker = setupWorker(...mockHandlers);
}

export {worker};
