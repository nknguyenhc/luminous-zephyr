import { Button } from '@mui/material'
import './login.scss'
import { Authenticator } from '../../auth/authenticator'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const navigate = useNavigate()
  const handleLogin = useCallback(async () => {
    const success = await Authenticator.authenticate(
      'userNameInput',
      'passwordInput'
    )

    if (success) {
      navigate('/')
    }
  }, [navigate])

  return (
    <Button className="center" variant="contained" onClick={handleLogin}>
      Login
    </Button>
  )
}
