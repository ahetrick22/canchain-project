import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/sass-compiled.css';
import Home from '../containers/Home';
import Register from '../containers/Register';
import CenterDashboard from '../containers/CenterDashboard';
import PlantDashboard from '../containers/PlantDashboard';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';

const App = () => {
    return (
      <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/centerdashboard" component={CenterDashboard} />
        <Route exact path="/plantdashboard" component={PlantDashboard} />
      </Switch>
    </>
  );
}


export default App;