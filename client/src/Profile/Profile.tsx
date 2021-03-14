import { Button } from '@material-ui/core';
import React from 'react';
import styles from './Profile.module.scss';
import { ImExit } from 'react-icons/im';
import { useLogout } from '../hooks/Auth/useLogout';

interface Props {}

const Profile: React.FC<Props> = () => {
    const { logout } = useLogout();

    return (
        <div className={styles.root}>
            <Button
                variant='contained'
                color='primary'
                endIcon={<ImExit />}
                onClick={logout}
            >
                Logout
            </Button>
        </div>
    );
};

export default Profile;
