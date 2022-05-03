import { config, createApiHandler } from '@ory/integrations/next-edge'

export { config }

export default createApiHandler({
  fallbackToPlayground: true,
  // Because vercel.app is a public suffix and setting cookies for
  // vercel.app is not possible.
  dontUseTldForCookieDomain: true
})
