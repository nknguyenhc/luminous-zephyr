import { createContext, useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AUTH_TOKEN_STORAGE_KEY } from '../constants/session-storage'

type AuthContextType = {
  token: string | null
  logIn: (userName: string, password: string) => void
  logOut: () => void
  authenticate: () => Promise<void>
}

const AuthContext = createContext(null as AuthContextType | null)

const parseCookie = (cookie: string) => {
  if (cookie === '') {
    return {}
  }
  return cookie
    .split(';')
    .map((v) => v.split('='))
    .reduce(
      (acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
        return acc
      },
      {} as { [key: string]: string }
    )
}

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState(
    sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
  )
  const navigate = useNavigate()

  const logIn = useCallback(
    (userName: string, password: string) => {
      // To be replaced with an API call
      setTimeout(() => {
        setToken('token')
        navigate('/')
      }, 1000)
    },
    [navigate]
  )

  const logOut = useCallback(() => {
    // To be replaced with an API call
    setTimeout(() => {
      setToken(null)
      navigate('/login')
    }, 1000)
  }, [navigate])

  const authenticate = useCallback(async () => {
    const cookieToken = parseCookie(document.cookie).token
    if (!cookieToken && !token) {
      navigate('/login')
      return
    }
    // token has been previously authenticated
    if (cookieToken === token) {
      return
    }

    // To be replaced with an API to authenticate the token
    // and get and set user data
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        sessionStorage.setItem(AUTH_TOKEN_STORAGE_KEY, cookieToken)
        setToken(cookieToken)
        resolve()
      }, 1000)
    })
    // If authentication fail then redirect to login page
  }, [token, navigate])

  return (
    <AuthContext.Provider value={{ token, logIn, logOut, authenticate }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
