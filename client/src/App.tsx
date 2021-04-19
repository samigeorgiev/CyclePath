import { CircularProgress } from '@material-ui/core'
import React, { Suspense, useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Nav } from './components'
import { AuthContext, AuthContextInterface } from './context/Auth'
import { useRefreshToken } from './hooks'
import Error from './pages/Error'

const Home = React.lazy(() => import('./pages/Home'))
const Profile = React.lazy(() => import('./pages/Profile'))
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
const Map = React.lazy(() => import('./pages/Map'))

const App = () => {
    useRefreshToken()

    const { authState } = useContext<AuthContextInterface>(AuthContext)

    return (
        <>
            <Suspense fallback={<CircularProgress />}>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    {authState ? (
                        <Route exact path='/map'>
                            <Map />
                        </Route>
                    ) : null}
                    {authState ? (
                        <Route exact path='/profile'>
                            <Profile />
                        </Route>
                    ) : null}
                    {authState ? null : (
                        <Route exact path='/login'>
                            <Login />
                        </Route>
                    )}
                    {authState ? null : (
                        <Route exact path='/register'>
                            <Register />
                        </Route>
                    )}
                    <Route path='/'>
                        <Error />
                    </Route>
                </Switch>
            </Suspense>
            <ToastContainer />
            <Nav />
        </>
    )
}

export default App
