import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import { Button } from 'reactstrap';

class Register extends Component {

  constructor(props, context) {

    super(props);
    this.contracts = context.drizzle.contracts;

    this.state = {
      centerName: '',
      city: '',
      state: '',
      contactName: '',
      username: '',
      password: '',
      verifyPassword: '',
      accountAddress: this.contracts.BagCount.currentProvider.selectedAddress,
      accountType: '',
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
      await this.props.history.push('/login');
    }
  }

  render() {
    return(
      <div className='main-class'>
      <div className ="container">
      <div className = "row">
      <div className = "col-2">
      </div>
      <div className="col-8 register-page">
       <h1>Create New Account </h1>
       <div role="form">
       <div className="form-group">
          <label>Location Name</label>
             <input type='text' placeholder="Location Name" value={this.state.centerName}
      onChange={event => this.onCenterNameChange(event.target.value)}></input>       
      </div>   
      <div className="form-group">
              <label>City</label>
              <input type='text' placeholder="City" value={this.state.city}
      onChange={event => this.onCityChange(event.target.value)}></input>
            </div>   
            <div className="form-group">
              <label>State</label>
              <input type='text' placeholder="State - 2 letter abbreviation" value={this.state.state}
      onChange={event => this.onStateChange(event.target.value)}></input>
            </div>   
            <div className="form-group">
                          <label>Contact Full Name</label>
              <input type='text' placeholder="Contact Name" value={this.state.contactName}
      onChange={event => this.onContactNameChange(event.target.value)}></input> 
            </div>   
            <div className="form-group">
                    <label>Username</label>
              <input type='text' placeholder="Username" value={this.state.username}
      onChange={event => this.onUsernameChange(event.target.value)}></input>
            </div>   
            <div className="form-group">
                    <label>Account Address</label>
              <input type='text' readOnly={true} value={this.state.accountAddress}></input>     
              </div>   
              <div className="form-group">
              <label>Password</label>
              <input type='password' placeholder="Password" value={this.state.password}
      onChange={event => this.onPasswordChange(event.target.value)}></input>
            </div>   
            <div className="form-group">
    <label>Verify Password</label>
     <input type='password' placeholder="Verify Password" value={this.state.verifyPassword}
      onChange={event => this.onVerifyPasswordChange(event.target.value)}></input>
            </div>   
            <div className="form-group">
            <div className="form-check">
          <label>Redemption Center</label>
      <input className = "radio" type="radio" name="accountType" value="Center" checked={this.state.accountType === "Center"} onChange={event => this.handleOptionChange(event.target.value)}></input>
      </div>
      <div className="form-check">

      <label>Recycling Plant</label>
      <input className="radio" type="radio" name="accountType" value="Plant" checked={this.state.accountType === "Plant"} onChange={event => this.handleOptionChange(event.target.value)}></input>
             </div>
             </div>
             </div>
             <Button color="success" onClick={this.handleSignUpClick}>Register</Button> 
             <br />
             </div>
             </div>
            <div className = "col-2">
            </div>
            </div>
            </div>
        )  
  }
}

Register.contextTypes = {
  drizzle: PropTypes.object
}


export default connect(null, actions)(Register);

