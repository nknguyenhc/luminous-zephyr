import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import './App.scss'
import { AuthProvider } from './context/auth-context'
import { Home } from './views/home/home'
import { Login } from './views/login/login'
import { PrivateRoute } from './routes/private-route'
import LoadingSpinner from './components/content-component/loading-spinner'
import { LoadingProvider, useLoading } from './context/loading-context'

function AppContent() {
  const { loading } = useLoading()

  return (
    <>
      {loading && <LoadingSpinner />} {/* Render loading spinner */}
      <Routes>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/home">
          <Route element={<PrivateRoute />}>
            <Route index element={<Home />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <LoadingProvider>
          <AppContent />
        </LoadingProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
