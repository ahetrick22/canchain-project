import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import DashboardHeader from './DashboardHeader';
import PropTypes from 'prop-types';

class CenterDashboard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      user: null,
      count: 0,
      confirmed: false,
      confirmationString: ''
    }
    this.contract = context.drizzle.contracts.BagCount;
  }

  componentDidMount = () => {
    //get the current user to display a welcome message on their dashboard
    fetch('/currentuser',
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

  createDelivery = async () => {
    //the center that is creating the delivery
    const deliveryInfo = {
      centerId: this.state.user.id,
    }
    // send the current count to the contract (center address comes from web3 injection)
    this.contract.methods.recordCount(this.state.count).send()
      .then(data => {
        //this is the delivery id from the contract, which will need to be referenced for the plant to verify it
        deliveryInfo.contractId = data.events.LogCenterDelivery.returnValues.id;
        //send the delivery to the SQL DB
        fetch('/delivery', {
          method: 'POST',
          mode: 'cors',
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-type": "application/json"
          },
          body: JSON.stringify(deliveryInfo)     
        }).then(res => res.json())
          .then(data => {
            this.setState({confirmed:true})
            this.setState({confirmationString: `Your transaction is confirmed with a bag count of ${this.state.count} and contract ID of ${data.contractId}.`})
            this.setState({ count: '' })
          })
      })
  }

  // viewPreviousDeliveries = () => {
  //   fetch(`/deliveries/${this.state.user.id}`,
  //   {
  //     headers: {
  //     "Authorization": `Bearer ${localStorage.getItem('token')}`,
  //     }
  //   })
  //   .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //     })
  //   .catch(error => {
  //     console.log(error);
  //   });  
  // }

  onInputChange = count => {
    this.setState({ count });
  }

  seeReconciliations = () => {

  }

  render() {
    return(
   //   if(!authenticated) then redirect
        <>
          <DashboardHeader history={this.props.history}/>
          <label>Enter your count to get an id:</label>
          <input value={this.state.count}
            onChange={e => this.onInputChange(e.target.value)} />          
          <button onClick={this.createDelivery}> Create a Delivery </button>
          <button onClick={this.seeReconciliations}> See Reconciliations </button>
          <p>{this.state.confirmed && this.state.confirmationString}</p>
        </>
    )
  }
}

CenterDashboard.contextTypes = {
  drizzle: PropTypes.object
}

export default connect(null, actions)(CenterDashboard);
