import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

class Login extends Component {

  state = {
      username: '',
      password: ''
    }
  
   onPasswordInputChange = password => {
      this.setState({ password })
    }

    onUsernameInputChange = username => {
      this.setState({ username })
    }

    //log in a user (non-Metamask)
    handleLoginClick = () =>  {
      const data = { username: this.state.username, password: this.state.password }
      //log them in, and then direct to correct dashboard
      this.props.login(data, () => {
          this.props.history.push(`/dashboard`);
      });
  }

  render() {
    if (this.props.user && Object.keys(this.props.user).length !== 0) {
      return <Redirect to="/dashboard" />
    }
      return(
        <div className="main-class">
          <div className ="container">
          <div className = "row">
          <div className = "col-1">
          </div>
          <div className="col-10 card login-card">
          <h1>CanChain</h1>
          <h4>A distributed ledger system for secure, verifiable data</h4>
          <div>
          {this.props.authError ? <div className="alert alert-danger" role="alert">
            Invalid username/password - please try again.
          </div> : <></>}
          <label><strong>Username:</strong></label>
           <input type='text' value={this.state.username}
    onChange={event => this.onUsernameInputChange(event.target.value)}></input>  
        </div> 
        <div>
      <label><strong>Password: </strong></label>            
    <input type='password' value={this.state.password}
    onChange={event => this.onPasswordInputChange(event.target.value)}></input>
          </div>
           <Button color="success" onClick={this.handleLoginClick}>Login</Button> 
           <br />
           <p className="new-user"><strong>New User? <Link to='/register' className="register"> Register now!</Link></strong></p>
          </div>
          <div className = "col-1">
          </div>
          </div>
        </div>
      </div>
    )        
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    authError: state.authReducer.errorMessage
    }
}

export default connect(mapStateToProps, actions)(Login);