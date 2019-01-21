import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from '../actions';


class Register extends Component {

  constructor(props, context) {

    super(props);
    this.contracts = context.drizzle.contracts;

    this.state = {
      centerName: '',
      city: '',
      state: 'NY',
      contactName: '',
      username: '',
      password: '',
      verifyPassword: '',
      accountAddress: this.contracts.BagCount.currentProvider.selectedAddress,
      accountType: 'center',
      passwordMismatch: false
    }
  }

  validateVerifiedPassword = () => {
    return this.state.password === this.state.verifyPassword;
  }

  onCenterNameChange = centerName => {
    this.setState({ centerName })
  }

  onCityChange = city => {
    this.setState({ city })
  }

  onStateChange = state => {
    this.setState({ state })
  }

  onContactNameChange = contactName => {
    this.setState({ contactName })
  }

  onUsernameChange = username => {
    this.setState({ username })
  }
  
  onPasswordChange = password => {
    this.setState({ password })
  }

  onVerifyPasswordChange = verifyPassword => {
    this.setState({ verifyPassword })
  }

  handleOptionChange = accountType => {
    this.setState({ accountType });
  }

  //log in a user (non-Metamask)
  handleSignUpClick = async () =>  {
    //verify that same password was entered twice
    if(!this.validateVerifiedPassword()) {
      this.setState({ passwordMismatch: true });
    } else {
      const data = {
        centerName: this.state.centerName, 
        city: this.state.city,
        state: this.state.state,
        contactName: this.state.contactName,
        username: this.state.username,
        password: this.state.password,
        accountAddress: this.state.accountAddress,
        accountType: this.state.accountType
      } 
      await this.props.signup(data)
      await this.props.history.push('/');
    }
  }

  render() {
    return(
      <>
       <h1>Create New Account </h1>
          <label>Center Name</label>
             <input type='text' value={this.state.centerName}
      onChange={event => this.onCenterNameChange(event.target.value)}></input>               
              <label>City</label>
              <input type='text' value={this.state.city}
      onChange={event => this.onCityChange(event.target.value)}></input>
              <label>State</label>
              <input type='text' value={this.state.state}
      onChange={event => this.onStateChange(event.target.value)}></input>
                    <label>Contact Full Name</label>
              <input type='text' value={this.state.contactName}
      onChange={event => this.onContactNameChange(event.target.value)}></input> 
                    <label>Username</label>
              <input type='text' value={this.state.username}
      onChange={event => this.onUsernameChange(event.target.value)}></input>
                    <label>Account Address (from Metamask login)</label>
              <input type='text' readOnly={true} value={this.state.accountAddress}></input>     
              <label>Password</label>
              <input type='password' value={this.state.password}
      onChange={event => this.onPasswordChange(event.target.value)}></input>
    <label>Verify Password</label>
     <input type='password' value={this.state.verifyPassword}
      onChange={event => this.onVerifyPasswordChange(event.target.value)}></input>
          <label>Redemption Center</label>
      <input type="radio" name="accountType" value="Center" checked={this.state.accountType === "Center"} onChange={event => this.handleOptionChange(event.target.value)}></input>
      <label>Recycling Plant</label>
      <input type="radio" name="accountType" value="Plant" checked={this.state.accountType === "Plant"} onChange={event => this.handleOptionChange(event.target.value)}></input>
             <button onClick={this.handleSignUpClick}>Register Account</button> 
             <br />
             <Link to='/'>Back to Home</Link>
            </>
        )  
  }
}

Register.contextTypes = {
  drizzle: PropTypes.object
}


export default connect(null, actions)(Register);

