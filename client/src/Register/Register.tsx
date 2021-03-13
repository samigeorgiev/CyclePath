import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import RegisterForm from '../components/RegisterForm';
import styles from './Register.module.scss'
// import { toast } from 'react-toastify';

interface Props {}

const Register: React.FC<Props> = () => {
  const [name, setName] = useState<string> ("");
  const [email, setEmail] = useState<string> ("");
  const [password, setPassword] = useState<string> ("");

  let history = useHistory()

  const register = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/auth/sign-up`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        name: name,
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
      <RegisterForm
        name={name}
        email={email}
        password={password}
        handleName={e => setName(e.target.value)}
        handleEmail={e => setEmail(e.target.value)}
        handlePassword={e => setPassword(e.target.value)}
        handleRegister={() => register()}
      />
    </div>
  )
}

export default Register