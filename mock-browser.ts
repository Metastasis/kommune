import { setupWorker } from 'msw'
import { mockHandlers } from '@features/calculation'
import { mockHandlers as servicesMocks } from '@features/services'
import { mockHandlers as templateMocks } from '@features/template'
import { mockHandlers as tariffsMocks } from '@features/tariffs'

let worker = null;

if (typeof window !== 'undefined') {
  // This configures a Service Worker with the given request handlers.
  worker = setupWorker(
    ...mockHandlers,
    ...servicesMocks,
    ...templateMocks,
    ...tariffsMocks
  );
}

export {worker};
