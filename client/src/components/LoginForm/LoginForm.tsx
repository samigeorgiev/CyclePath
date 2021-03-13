import React from 'react'
import styles from './LoginForm.module.scss'

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
      Login
      <input type="text" placeholder="E-mail:" value={props.email} onChange={props.handleEmail} />
      <input type="password" placeholder="Password:" value={props.password} onChange={props.handlePassword} />
      <button onClick={props.handleLogin}>LOGIN</button>
    </div>
  )
}

export default LoginForm