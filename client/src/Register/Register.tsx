import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import decode from 'jwt-decode'
import { toast } from 'react-toastify';
import { DecodedToken } from '../tokenTypes/DecodedToken';
import RegisterForm from '../components/RegisterForm';
import styles from './Register.module.scss'
import { AuthContext } from '../context/Auth/AuthContext';
import { AuthContextInterface } from '../context/Auth/AuthContext.interface';
// import { toast } from 'react-toastify';

interface Props {}

const Register: React.FC<Props> = () => {
  const [name, setName] = useState<string> ("");
  const [email, setEmail] = useState<string> ("");
  const [password, setPassword] = useState<string> ("");

  const { setAuthState } = useContext<AuthContextInterface>(AuthContext)

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
          const { exp, id }: DecodedToken = decode(data.token)
          setAuthState({
            exp: exp * 1000 - Date.now(),
            token: data.token,
            userId: id
          })
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