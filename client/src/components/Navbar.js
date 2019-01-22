import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }

  componentDidMount = async () => {
    if (localStorage.getItem('token')) {
    //get the current user to display a welcome message on their dashboard
        await fetch('/currentuser',
        {
          headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          }
        })
        .then(res => res.json())
          .then(data => {
            this.setState({ user: data })
          })
        .catch(error => {
          console.log(error);
        });  
    } 
  }


  logoutUser = async () => {
    await this.props.signout();
    await this.props.history.push('/');
  }

  render () {
    return (
      <nav className="navbar navbar-light">
      <a className="navbar-brand logo" href="/">
      <img src ={window.location.origin + '/favicon.ico'} alt="logo"></img>
        CanChain</a>
              <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                  {this.state.user ? 
                    <button className="btn btn-danger my-2 my-sm-0" type="submit" onClick={this.logoutUser}>Logout</button>
                    : 
                    <button className="btn btn-success">Login</button>}
                    </li>
      
              </ul>
      </nav>
        )
  }
}

export default connect(null, actions)(Navbar);