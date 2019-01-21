import React from 'react';
import '../css/App.css';
import Home from '../containers/Home';
import Register from '../containers/Register';
import CenterDashboard from '../containers/CenterDashboard';
import PlantDashboard from '../containers/PlantDashboard';
import { Switch, Route } from 'react-router-dom';

const App = () => {
    return (
      <>
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