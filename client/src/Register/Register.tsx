import React, { useState } from 'react'
import RegisterForm from '../components/RegisterForm';
import styles from './Register.module.scss'

interface Props {}

const Register: React.FC<Props> = () => {
  const [email, setEmail] = useState<string> ("");
  const [password, setPassword] = useState<string> ("");

  const register = () => {
    
  }

  return (
    <div className={styles.root}>
      <RegisterForm
        email={email}
        password={password}
        handleEmail={e => setEmail(e.target.value)}
        handlePassword={e => setPassword(e.target.value)}
        handleRegister={() => register()}
      />
    </div>
  )
}

export default Register