<<<<<<< HEAD
import React, { Suspense, useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Nav } from './components'
=======
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Nav } from './components';
import { MapProvider } from './Map/MapProvider';
>>>>>>> 3842d24b058ee1cf331407076a0a0e595fb4ad9a
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRefreshToken } from './hooks/Auth/useRefreshToken';
import { AuthContext } from './context/Auth/AuthContext';
import { AuthContextInterface } from './context/Auth/AuthContext.interface';
import { MapProvider } from './Map/MapProvider';

const Home = React.lazy(() => import('./Home'));
const Map = React.lazy(() => import('./Map'));
const Login = React.lazy(() => import('./Login'));
const Register = React.lazy(() => import('./Register'));

const App = () => {
    useRefreshToken()

    const { authState } = useContext<AuthContextInterface>(AuthContext)
    console.log(authState);
    
    return (
        <Suspense fallback='loading...'>
            <Nav />
            <ToastContainer />
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                {authState ?
                    <Route exact path='/map'>
                        <MapProvider />
                    </Route> : null}
                {authState ? null :
                    <Route exact path='/login'>
                        <Login />
                    </Route>}
                {authState ? null :
                    <Route exact path="/register">
                        <Register />
                    </Route>}
                <Route path='/'>
                    <div>404</div>
                </Route>
            </Switch>
        </Suspense>
    );
};

export default App;
