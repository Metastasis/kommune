import {Configuration, Session, V0alpha2Api} from '@ory/client';
import { edgeConfig } from '@ory/integrations/next'
import {AxiosError} from 'axios'
import {
  useEffect,
  useState,
  useContext,
  createContext,
  FC,
  ReactElement
} from 'react';

interface AuthContext {
  session: null | Session,
  error: any,
  logoutUrl: string
}

const kratos = new V0alpha2Api(new Configuration(edgeConfig))
const initialContext = {
  session: null,
  error: null,
  logoutUrl: ''
}
const AuthContext = createContext<AuthContext>(initialContext)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: FC<{children: ReactElement}> = (props) => {
  const [ctx, setCtx] = useState<AuthContext>(initialContext)
  // Contains the current session or undefined.
  const [session, setSession] = useState<Session | null>(null)
  // The URL we can use to log out.
  const [logoutUrl, setLogoutUrl] = useState<string>('')
  // The error message or undefined.
  const [error, setError] = useState<any>(null)
  useEffect(() => {
    // If the session or error have been loaded, do nothing.
    if (ctx.session || ctx.error || typeof window === 'undefined') {
      return
    }
    // Try to load the session.
    kratos
      .toSession()
      .then(({data: session}) => {
        // Session loaded successfully! Let's set it.
        setSession(session)
        // Since we have a session, we can also get the logout URL.
        return kratos
          .createSelfServiceLogoutFlowUrlForBrowsers()
          .then(({ data }) => setLogoutUrl(data.logout_url))
      })
      .catch((err: AxiosError) => {
        setError({
          error: err.toString(),
          data: err.response?.data
        })
      })
  }, [])
  return (
    <AuthContext.Provider value={{session, error, logoutUrl}}>
      {props.children}
    </AuthContext.Provider>
  )
}
