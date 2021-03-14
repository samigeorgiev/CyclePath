import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthContext';
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface';
import styles from './Nav.module.scss';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { AiOutlineHome } from 'react-icons/ai';
import { SiGooglemaps } from 'react-icons/si';
import { HiOutlineLogin } from 'react-icons/hi';

interface Props {}

const Nav: React.FC<Props> = () => {
    const history = useHistory();

    const { pathname } = useLocation();

    const { authState } = useContext<AuthContextInterface>(AuthContext);

    const [navAction, setNavAction] = useState<string>(pathname);

    useEffect(() => {
        history.push(navAction);
    }, [navAction]);

    return (
        <BottomNavigation
            value={navAction}
            onChange={(e, newAction) => setNavAction(newAction)}
            className={styles.root}
        >
            <BottomNavigationAction
                label='Home'
                icon={<AiOutlineHome />}
                value='/'
            />
            {authState ? (
                <BottomNavigationAction
                    label='Map'
                    icon={<SiGooglemaps />}
                    value='/map'
                />
            ) : (
                <BottomNavigationAction
                    label='Login'
                    icon={<HiOutlineLogin />}
                    value='/login'
                />
            )}
        </BottomNavigation>
    );
};

export default Nav;
