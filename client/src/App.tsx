import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Nav } from './components'
import { MapProvider } from './Map/MapProvider'

const Home = React.lazy(() => import('./Home'))

const App = () => {
    return (
        <Suspense fallback='loading...'>
            <Nav />
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/map'>
                    <MapProvider />
                </Route>
                <Route path='/'>
                    <div>404</div>
                </Route>
            </Switch>
        </Suspense>
    )
}

export default App
