import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/authContext'

export function PrivateRoute() {
  const user = useAuth()
  if (!user || !user.token) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}
