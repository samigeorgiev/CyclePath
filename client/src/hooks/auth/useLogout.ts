import { useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface'
import { AuthContextState } from '../../context/Auth/AuthContextState'

interface LogoutState {
    logout: () => void
    authState: AuthContextState | null
}

export const useLogout = (): LogoutState => {
    const { setAuthState, authState } = useContext<AuthContextInterface>(
        AuthContext
    )

    let history = useHistory()

    const logout = useCallback(async () => {
        if (!authState?.token) {
            return
        }

        await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authState?.token}`
            }
        })

        setAuthState(null)
        history.push('/')
    }, [authState?.token, setAuthState])

    return { logout, authState }
}
