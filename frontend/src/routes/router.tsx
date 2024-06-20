import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from 'react-router-dom'
import { Home } from '../views/home/home'
import { Authenticator } from '../auth/authenticator'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Home />}
      loader={async () => {
        const isAuthenticated = await Authenticator.isAuthenticated()

        if (!isAuthenticated) {
          throw redirect('/login')
        }
        return null
      }}
    />
  )
)
