import { RouterProvider } from 'react-router-dom'
import './App.scss'
import { router } from './routes/router'
import { Authenticator } from './auth/authenticator'
import { AuthContext } from './context/authContext'

const authenticator = new Authenticator()
function App() {
  return (
    <AuthContext.Provider value={authenticator}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}

export default App
