import { Button } from '@mui/material'
import './login.scss'
import { useCallback } from 'react'
import { useAuth } from '../../context/auth-context'

export function Login() {
  //const user = useAuth()
  const handleLogin = useCallback(async () => {
    // user!.logIn()
    try {
      const res = await fetch(`http://127.0.0.1:8000/login`, {
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
