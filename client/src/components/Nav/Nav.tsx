import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Nav.module.scss'

interface Props {}

const Nav: React.FC<Props> = () => {
    const routes = ['Home', 'Map']
    return (
        <div className={styles.root}>
            {routes.map((route) => (
                <NavLink
                    to={route}
                    className={styles.link}
                    activeClassName={styles.active}
                    key={route.toLowerCase()}
                >
                    {route}
                </NavLink>
            ))}
        </div>
    )
}

export default Nav
