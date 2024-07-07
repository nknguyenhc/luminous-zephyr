import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/auth-context'
import { useEffect } from 'react'

export function PrivateRoute() {
  const user = useAuth()
  useEffect(() => {
    user!.authenticate()
  }, [user])

  return <Outlet />
}
