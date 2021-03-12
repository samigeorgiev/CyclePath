import React from 'react';
import Map from '../../containers/Map/Map';
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
        <Switch>
          <Route path="/map">
            <Map />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Layout;