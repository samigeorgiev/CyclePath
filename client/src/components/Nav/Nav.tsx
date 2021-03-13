import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface'
import styles from './Nav.module.scss'

interface Props {}

const Nav: React.FC<Props> = () => {
    const { authState } = useContext<AuthContextInterface>(AuthContext)

    const authRoutes = [
        { name: 'Home', path: '/' },
        { name: 'Map', path: '/map' },
    ]
    const noAuthRoutes = [
        { name: 'Home', path: '/' },
        { name: 'Login', path: '/login' }
    ]
    return (
        <div className={styles.root}>
            {authState ? authRoutes.map((route) => (
                <NavLink
                    exact
                    to={route.path}
                    className={styles.link}
                    activeClassName={styles.active}
                    key={route.name.toLowerCase()}
                >
                    {route.name}
                </NavLink>)
            ) : noAuthRoutes.map((route) => (
                <NavLink
                    exact
                    to={route.path}
                    className={styles.link}
                    activeClassName={styles.active}
                    key={route.name.toLowerCase()}
                >
                    {route.name}
                </NavLink>)
            )}
        </div>
    )
}

export default Nav
