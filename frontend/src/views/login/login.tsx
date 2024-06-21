import { Button } from '@mui/material'
import './login.scss'
import { useCallback } from 'react'
import { useAuth } from '../../context/authContext'

export function Login() {
  const user = useAuth()

  const handleLogin = useCallback(() => {
    if (!user) {
      throw new Error('useAuth must be used within an AuthProvider')
    }
    user.logIn('username', 'password')
  }, [user])
  return (
    <Button className="login-center" variant="contained" onClick={handleLogin}>
      Login
    </Button>
  )
}
