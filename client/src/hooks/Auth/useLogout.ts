import { useCallback, useContext } from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface';
import { AuthContextState } from '../../context/Auth/AuthContextState';

interface LogoutState {
    logout: () => void;
    authState: AuthContextState | null;
}

export const useLogout = (): LogoutState => {
    const { setAuthState, authState } = useContext<AuthContextInterface>(
        AuthContext
    );

    const logout = useCallback(async () => {
        if (!authState?.token) {
            return;
        }

        await fetch(`${process.env}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authState?.token}`
            }
        });

        setAuthState(null);
    }, [authState?.token, setAuthState]);

    return { logout, authState };
};
