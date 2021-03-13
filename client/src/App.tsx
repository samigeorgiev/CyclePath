import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Nav } from './components';
import { MapProvider } from './Map/MapProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = React.lazy(() => import('./Home'));
const Map = React.lazy(() => import('./Map'));
const Login = React.lazy(() => import('./Login'));
const Register = React.lazy(() => import('./Register'));

const App = () => {
    return (
        <Suspense fallback='loading...'>
            <Nav />
            <ToastContainer />
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/map'>
                    <MapProvider />
                </Route>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/register'>
                    <Register />
                </Route>
                <Route path='/'>
                    <div>404</div>
                </Route>
            </Switch>
        </Suspense>
    );
};

export default App;
