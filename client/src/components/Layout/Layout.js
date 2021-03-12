import React from 'react';
import MapContainer from '../../containers/Map/Map';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './Layout.css';
import NavigationBar from '../../containers/NavigationBar/NavigationBar';

const Layout = () => {
  return (
    <Router>
      <div className="Layout">
        <NavigationBar />
        <div className="Container">
          <Switch>
            <Route path="/Map">
              <MapContainer />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default Layout;