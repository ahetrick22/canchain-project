import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/sass-compiled.css';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Dashboard from '../containers/Dashboard';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../containers/Navbar';

const App = ({history}) => {
    return (
      <>
      <Navbar history={history} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </>
  );
}


export default App;