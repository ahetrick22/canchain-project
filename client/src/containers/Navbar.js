import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';

class Navbar extends Component {

  logoutUser = async () => {
    await this.props.signout();
    await this.props.history.push('/');
  }

  render () {
      if (this.props.user && Object.keys(this.props.user).length !== 0) {
        return (
        <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand mr-auto logo">
        <img src ={window.location.origin + '/favicon.ico'} alt="logo"></img>CanChain</Link>
            <ul className="navbar-brand mx-auto">
            <li className="nav-item nav-welcome">Welcome, {this.props.user.username}.</li> 
            </ul>
                <ul className=" ml-auto">
                    <li className="nav-item">
                      <button className="btn btn-danger" type="submit" onClick={this.logoutUser}>Logout</button>               
                    </li>
                </ul>
        </nav>
          )
      } else {
        return   (<nav className="navbar navbar-light">
      <Link to="/" className="navbar-brand logo">
        <img src ={window.location.origin + '/favicon.ico'} alt="logo"></img>CanChain</Link>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to="/login"><button className="btn btn-success">Login</button></Link>
                      </li>
                </ul>
        </nav>
        )  
    }

  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  }
}

export default connect(mapStateToProps, actions)(Navbar);