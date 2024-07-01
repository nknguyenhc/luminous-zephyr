import { Button } from '@mui/material'
import './login.scss'
import { useCallback, useEffect } from 'react'
import { useAuth } from '../../context/auth-context'

export function Login() {
  //const user = useAuth()
  // const handleLogin = useCallback(async () => {
  //   // user!.logIn()
  //   try {
  //     const res = await fetch(`http://127.0.0.1:8000/login`, {
  //       method: 'POST',
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [])

  console.log(document.cookie)
  return (
    <a href="http://127.0.0.1:8000/login">
      <Button className="login-center" variant="contained">
        Login
      </Button>
    </a>
  )
}
