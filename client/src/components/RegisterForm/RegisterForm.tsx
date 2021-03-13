import React from 'react'
import styles from './RegisterForm.module.scss'

interface Props {
  name: string,
  email: string,
  password: string,
  handleName: (e : React.ChangeEvent<HTMLInputElement>) => void,
  handleEmail: (e : React.ChangeEvent<HTMLInputElement>) => void,
  handlePassword: (e : React.ChangeEvent<HTMLInputElement>) => void,
  handleRegister: () => void
}

const RegisterForm: React.FC<Props> = props => {
  return (
    <div className={styles.root}>
      Register
      <input type="text" placeholder="Name:" value={props.name} onChange={props.handleName} />
      <input type="text" placeholder="E-mail:" value={props.email} onChange={props.handleEmail} />
      <input type="password" placeholder="Password:" value={props.password} onChange={props.handlePassword} />
      <button onClick={props.handleRegister}>REGISTER</button>
    </div>
  )
}

export default RegisterForm