import { createContext } from 'react'
import { Authenticator } from '../auth/authenticator'

export const AuthContext = createContext(null as Authenticator | null)
