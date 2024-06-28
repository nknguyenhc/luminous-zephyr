import { Button } from '@mui/material'
import './login.scss'
import { useCallback } from 'react'
import { useAuth } from '../../context/auth-context'

export function Login() {
  //const user = useAuth()
  const handleLogin = useCallback(async () => {
    // user!.logIn()
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        method: 'POST',
        mode: 'no-cors',
      })
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <Button className="login-center" variant="contained" onClick={handleLogin}>
      Login
    </Button>
  )
}
