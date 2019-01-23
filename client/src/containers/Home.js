import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

class Home extends Component {

    render() {
        return(
         <div>Home</div>
        )
           
  }
}

export default connect(null, actions)(Home);