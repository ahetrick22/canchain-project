import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import DashboardHeader from './DashboardHeader';
import PropTypes from 'prop-types';
import UnverifiedDeliveries from '../components/UnverifiedDropdown';

class PlantDashboard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      user: null,
      count: 0,
      unverifiedDeliveries: [],
      selectedContractId: 0
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

    //get the unverified deliveries to render them in a dropdown
    fetch('/unverifieddeliveries', 
    {
      headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(res => res.json())
      .then(data => {
        data.forEach(item => {
          this.setState( {unverifiedDeliveries: this.state.unverifiedDeliveries.concat([item.contract_id]) })
        })
      })
  }

  verifyLatestDeliveries = () => {
    //show them a modal to be able to put in the plant count & verify
    //send the verifyCount method & also update the DB
    const deliveryVerification = {
      contract_id : this.state.selectedContractId,
      plantCount: this.state.count
    }
    this.contract.methods.verifyDelivery(this.state.selectedContractId, this.state.count).send()
      .then(data => {
        //this is the discrepancy emitted from the contract
        deliveryVerification.discrepancy = data.events.Discrepancy.returnValues.difference;
        fetch('/verifydelivery', {
          method: 'PUT',
          mode: 'cors',
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-type": "application/json"
          },
          body: JSON.stringify(deliveryVerification) 
        }).then(res => res.json())
        .then(data => {
          //save those discrepancies to go into a menu
          console.log(data);
        })
      }).catch(error => {
        console.error(error);
      })
  }

  onInputChange = count => {
    this.setState({ count });
  }

  reconcileDiscrepancies = () => {
    console.log('reconciling');
  }

  //get the selected dropdown option
  handleDropdownChange = async (value) => {
    await this.setState({ selectedContractId: value })
  }

  render() {
    return(
      <div className="main-class">
      <div className ="container">
       <div className = "row">
         <div className="col dashboard-page">
          <DashboardHeader history={this.props.history}/>
          <UnverifiedDeliveries unverifiedDeliveries={this.state.unverifiedDeliveries} handleDropdownChange={this.handleDropdownChange}/>
          <label>Enter your count to verify the selected delivery:</label>
          <input value={this.state.count}
            onChange={e => this.onInputChange(e.target.value)} />          
          <button onClick={this.verifyLatestDeliveries}>Verify Latest Deliveries</button>
          <button onClick={this.reconcileDiscrepancies}>View and Reconcile Discrepancies</button>
          </div>
      </div>
      </div>
      </div>
    )
  }
}

PlantDashboard.contextTypes = {
  drizzle: PropTypes.object
}

export default connect(null, actions)(PlantDashboard);