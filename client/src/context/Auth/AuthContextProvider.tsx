import React, { FunctionComponent, useState } from 'react'
import { AuthContext } from './AuthContext'
import { AuthContextState } from './AuthContextState'

interface Props {
    children: React.ReactNode
}

export const AuthContextProvider: FunctionComponent<Props> = props => {
    const [authState, setAuthState] = useState<AuthContextState | null>(null)

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {props.children}
        </AuthContext.Provider>
    )
}
