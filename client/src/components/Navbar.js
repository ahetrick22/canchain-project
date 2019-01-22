import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
      <a className="navbar-brand logo" href="/">
      <img src ={window.location.origin + '/favicon.ico'} alt="logo"></img>
        CanChain</a>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
              <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <button className="btn btn-danger my-2 my-sm-0" type="submit" onClick={this.props.signout}>Logout</button>
                    </li>
      
              </ul>
        </div>
      </nav>
        )
  }
}

export default connect(null, actions)(Navbar);