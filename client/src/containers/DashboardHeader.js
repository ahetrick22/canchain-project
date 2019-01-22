import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class DashboardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount = () => {
    const config = {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }
    };
    fetch('/currentuser',
      config
    )
    .then(res => res.json())
      .then(data => {
        this.setState({ user: data })
      })
    .catch(error => {
      console.log(error);
    });  
  }

  render () {
    if(!this.state.user) {
      return <div>You aren't logged in, please return home and try again.</div>
    } else {
      const { username } = this.state.user;
      return (
        <>
          <h1><strong>{this.state.user.account_type} Dashboard</strong></h1>
          <h3> Welcome, {username}.</h3>
        </>
      )
    }
   
  }
}

export default connect(null, actions)(DashboardHeader);