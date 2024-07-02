import { createContext, useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AUTH_TOKEN_STORAGE_KEY } from '../constants/session-storage'

type AuthContextType = {
  token: string | null
  logIn: (userName: string, password: string) => void
  logOut: () => void
  authenticate: (token: string) => void
}

const AuthContext = createContext(null as AuthContextType | null)

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState(
    sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY) as string | null
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

  const authenticate = useCallback(async (newToken: string) => {
    // To be replaced with an API to authenticate the token
    // and get and set user data
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        sessionStorage.setItem(AUTH_TOKEN_STORAGE_KEY, newToken!)
        setToken(newToken)
        resolve()
      }, 1000)
    })

    // If authentication fail then redirect to login page
  }, [])

  return (
    <AuthContext.Provider value={{ token, logIn, logOut, authenticate }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
