import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.scss'
import { AuthProvider } from './context/auth-context'
import { Home } from './views/home/home'
import { Login } from './views/login/login'
import { PrivateRoute } from './routes/private-route'

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
