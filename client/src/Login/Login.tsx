import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import styles from './Login.module.scss'
import { toast } from 'react-toastify'

interface Props {}

const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState<string> ("");
  const [password, setPassword] = useState<string> ("");

  let history = useHistory()

  const login = () => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/sign-in`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          toast.error(data.message[0])
          return
        } else {
          toast.success("Successful!")
          history.push('/')
        }
      })
  }

  return (
    <div className={styles.root}>
      <LoginForm
        email={email}
        password={password}
        handleEmail={e => setEmail(e.target.value)}
        handlePassword={e => setPassword(e.target.value)}
        handleLogin={() => login()}
      />
      <a href="/register" className={styles.link}>Register Now!</a>
    </div>
  )
}

export default Login