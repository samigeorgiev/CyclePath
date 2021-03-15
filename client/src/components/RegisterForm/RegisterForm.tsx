import { Button, TextField, Typography } from '@material-ui/core';
import React from 'react';
import styles from './RegisterForm.module.scss';

interface Props {
    name: string;
    email: string;
    password: string;
    handleName: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRegister: () => void;
}

const RegisterForm: React.FC<Props> = (props) => {
    return (
        <div className={styles.root}>
            <Typography variant='h4' component='h1'>
                Register
            </Typography>
            <TextField
                className={styles.inputs}
                fullWidth
                variant='outlined'
                label='Name'
                size='small'
                value={props.name}
                onChange={props.handleName}
            />
            <TextField
                className={styles.inputs}
                fullWidth
                variant='outlined'
                label='E-Mail'
                size='small'
                value={props.email}
                onChange={props.handleEmail}
            />
            <TextField
                className={styles.inputs}
                fullWidth
                type='password'
                variant='outlined'
                label='Password'
                size='small'
                value={props.password}
                onChange={props.handlePassword}
            />
            <Button
                className={styles.button}
                fullWidth
                variant='contained'
                color='primary'
                onClick={props.handleRegister}
            >
                Register
            </Button>
        </div>
    );
};

export default RegisterForm;
