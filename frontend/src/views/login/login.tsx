import { Button } from '@mui/material'
import './login.scss'
import { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

export function Login() {
  const navigate = useNavigate()
  const authenticator = useContext(AuthContext)
  const handleLogin = useCallback(async () => {
    if (authenticator === null) {
      throw new Error('Authenticator is null')
    }

    const success = await authenticator.authenticate(
      'userNameInput',
      'passwordInput'
    )

    if (success) {
      navigate('/')
    }
  }, [navigate, authenticator])

  return (
    <Button className="center" variant="contained" onClick={handleLogin}>
      Login
    </Button>
  )
}
