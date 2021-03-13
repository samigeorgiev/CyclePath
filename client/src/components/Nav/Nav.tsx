import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Nav.module.scss'

interface Props {}

const Nav: React.FC<Props> = () => {
    const routes = [
        { name: 'Home', path: '/' },
        { name: 'Map', path: '/map' },
        { name: 'Login', path: '/login' }
    ]
    return (
        <div className={styles.root}>
            {routes.map((route) => (
                <NavLink
                    exact
                    to={route.path}
                    className={styles.link}
                    activeClassName={styles.active}
                    key={route.name.toLowerCase()}
                >
                    {route.name}
                </NavLink>
            ))}
        </div>
    )
}

export default Nav
