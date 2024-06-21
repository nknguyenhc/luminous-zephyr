import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
export function useAuth() {
  const authenticator = useContext(AuthContext)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (authenticator === null) {
      throw new Error('Authenticator is null')
    }

    authenticator.isAuthenticated().then((success) => {
      if (!success) {
        navigate('/login')
      }
      setIsAuthenticated(success)
    })
  }, [authenticator, navigate])

  return { isAuthenticated }
}
