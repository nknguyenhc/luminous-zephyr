import { createContext, useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type AuthContextType = {
  token: string | null
  logIn: (userName: string, password: string) => void
  logOut: () => void
}

const AuthContext = createContext(null as AuthContextType | null)

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState(null as string | null)
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

  return (
    <AuthContext.Provider value={{ token, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
