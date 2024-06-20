import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { Home } from '../views/home/home'

export const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Home />} />)
)
