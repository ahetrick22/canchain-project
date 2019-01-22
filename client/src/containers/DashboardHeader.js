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

  logoutUser = async () => {
    this.setState({user: null});
    await this.props.signout();
    await this.props.history.push('/');
  }

  render () {
    if(!this.state.user) {
      return <div>Loading...</div>
    } else {
      const { account_address, username } = this.state.user;
      return (
        <>
          <h1>{this.state.user.account_type} Dashboard</h1>
          <h3> Welcome, {username}. Your Metamask account is {account_address}.</h3>
        </>
      )
    }
   
  }
}

export default connect(null, actions)(DashboardHeader);