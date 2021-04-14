import { LatLngLiteral } from 'leaflet'
import React, { Suspense, useContext } from 'react'
import { MapContainer } from 'react-leaflet'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Nav } from './components'
import { AuthContext } from './context/Auth/AuthContext'
import { AuthContextInterface } from './context/Auth/AuthContext.interface'
import { useRefreshToken } from './hooks/Auth/useRefreshToken'
import { MapProvider } from './Map/MapProvider'

const Home = React.lazy(() => import('./Home'))
const Profile = React.lazy(() => import('./Profile'))
const Login = React.lazy(() => import('./Login'))
const Register = React.lazy(() => import('./Register'))

const App = () => {
    useRefreshToken()

    const { authState } = useContext<AuthContextInterface>(AuthContext)
    const defaultLocation: LatLngLiteral = {
        lat: 37.3347986,
        lng: -122.0091069
    }

    return (
        <>
            <Suspense fallback='loading...'>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    {authState ? (
                        <Route exact path='/map'>
                            <MapContainer
                                center={defaultLocation}
                                zoom={15}
                                className='map'
                                zoomControl={false}
                            >
                                <MapProvider />
                            </MapContainer>
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
                        <div>404</div>
                    </Route>
                </Switch>
            </Suspense>
            <ToastContainer />
            <Nav />
        </>
    )
}

export default App
