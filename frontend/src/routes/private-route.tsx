import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

export function PrivateRoute() {
  const user = useAuth()
  if (!user) {
    return <Navigate to="/login" />
  }

  user.authenticate()

  return <Outlet />
}
