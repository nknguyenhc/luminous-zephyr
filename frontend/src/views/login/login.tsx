import { Button } from '@mui/material'
import './login.scss'

export function Login() {
  return (
    <a href={`${process.env.REACT_APP_BACKEND_URL}/api/login`}>
      <Button className="login-center" variant="contained">
        Login
      </Button>
    </a>
  )
}
