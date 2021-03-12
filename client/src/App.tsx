import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Nav } from './components'

const Home = React.lazy(() => import('./Home'))
const Map = React.lazy(() => import('./Map'))

const App = () => {
    return (
        <Suspense fallback='loading...'>
            <Nav />
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/map'>
                    <Map />
                </Route>
                <Route path='/'>
                    <div>404</div>
                </Route>
            </Switch>
        </Suspense>
    )
}

export default App
