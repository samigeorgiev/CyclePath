import React from 'react'
import styles from './LoginForm.module.scss'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'

interface Props {
  email: string,
  password: string,
  handleEmail: (e : React.ChangeEvent<HTMLInputElement>) => void,
  handlePassword: (e : React.ChangeEvent<HTMLInputElement>) => void,
  handleLogin: () => void
}

const LoginForm: React.FC<Props> = props => {
  return (
    <div className={styles.root}>
      <Typography variant="h4" component="h1">
        Login
      </Typography>
      <TextField className={styles.inputs} fullWidth variant="outlined" label="E-Mail" size="small" value={props.email} onChange={props.handleEmail} />
      <TextField className={styles.inputs} fullWidth type="password" variant="outlined" label="Password" size="small" value={props.password} onChange={props.handlePassword} />
      <Button className={styles.button} fullWidth variant="contained" color="primary" onClick={props.handleLogin}>Login</Button>
    </div>
  )
}

export default LoginForm