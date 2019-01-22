import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

class Home extends Component {

  state = {
      username: '',
      password: '', 
      user: null
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
      //log them in, and then get the token to ID the user type and direct to correct dashboard
      this.props.login(data, () => {
        fetch('/currentuser',
        {headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }}
      )
      .then(res => res.json())
        .then(data => {
          this.setState({ user: data })
          this.props.history.push(`/${this.state.user.account_type}dashboard`);
        })
      .catch(error => {
        console.log(error);
      });
      });
  }

    render() {
        return(
          <div className="main-class">
            <div className ="container">
            <div className = "row">
            <div className = "col-2">
            </div>
            <div className="col-8 card login-card">
            <h1>CanChain</h1>
            <h4>A distributed ledger system for secure, verifiable data</h4>
            <div>
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
            <div className = "col-2">
            </div>
            </div>
            </div>
            </div>
        )
           
  }
}

export default connect(null, actions)(Home);