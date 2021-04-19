import { Link, Typography } from '@material-ui/core'
import decode from 'jwt-decode'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LoginForm } from '../../components'
import { AuthContext, AuthContextInterface } from '../../context/Auth'
import { DecodedToken } from '../../tokenTypes/DecodedToken'

interface Props {}

const Login: React.FC<Props> = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { setAuthState } = useContext<AuthContextInterface>(AuthContext)

    let history = useHistory()

    const login = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        fetch(`${process.env.REACT_APP_API_URL}/auth/sign-in`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then((res) => res.json())
            .then((data) => {
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
                    toast.success('Successful!')
                    history.push('/')
                }
            })
    }

    return (
        <div className='centered'>
            <LoginForm
                email={email}
                password={password}
                handleEmail={(e) => setEmail(e.target.value)}
                handlePassword={(e) => setPassword(e.target.value)}
                handleLogin={login}
            />
            <Typography variant='subtitle2' component='span'>
                Don't have an account?{' '}
                <Link href='/register'>Register Now!</Link>
            </Typography>
        </div>
    )
}

export default Login
