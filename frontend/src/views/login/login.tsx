import { Button } from '@mui/material'
import './login.scss'
import { useCallback } from 'react'
import { useAuth } from '../../context/auth-context'

export function Login() {
  const user = useAuth()

  const handleLogin = useCallback(() => {
    user!.logIn('username', 'password')
  }, [user])
  return (
    <Button className="login-center" variant="contained" onClick={handleLogin}>
      Login
    </Button>
  )
}
