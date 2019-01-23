import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import DashboardHeader from '../components/DashboardHeader';
import PropTypes from 'prop-types';
import UnverifiedDeliveries from '../components/UnverifiedDropdown';
import FullModal from './FullModal';
import DashboardTable from '../components/DashboardTable';
import { Redirect } from 'react-router-dom'

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

  componentDidMount =  () => {
    //get the unverified deliveries to render them in a dropdown
    fetch('/deliveries?unverified=true', 
    {
      headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(res => res.json())
      .then(data => {
        data.forEach(item => {
          this.setState( {unverifiedDeliveries: this.state.unverifiedDeliveries.concat([item]) })
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

  reconcileDiscrepancies = () => {
    console.log('reconciling');
  }

  //get the selected dropdown option
  handleDropdownChange = async (value) => {
    await this.setState({ selectedContractId: value })
  }

  viewChainRecord = async (contract_id) => {
    let chainRecord = {};
    await this.contract.methods.getDelivery(contract_id).call()
      .then(data => { 
          chainRecord.centerAddress = data[0];
          chainRecord.plantAddress = data[1];
          chainRecord.centerCount = data[2];
          chainRecord.plantCount = data[3];
          chainRecord.centerDt = data[4];
          chainRecord.plantDt = data[5];
          chainRecord.centerBn = data[6];
          chainRecord.plantBn = data[7];
    });
    return await chainRecord;
  }; 

  render() {
    if (!this.props.user) {
      return (<Redirect to="/login" />)
    } else {
      const { account_type } = this.props.user;
    return(
      <div className="main-class">
      <div className ="container">
       <div className = "row">
         <div className="col dashboard-page">
          <DashboardHeader account_type={account_type} history={this.props.history}/>
          <FullModal account_type={account_type} onClickFunc={this.verifyDelivery} buttonLabel="Verify Deliveries"/>          
          <DashboardTable viewChainRecord={this.viewChainRecord} account_type={account_type} deliveries={this.state.unverifiedDeliveries} />
      
          </div>
      </div>
      </div>
      </div>
    )
  }
}
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  }
}

PlantDashboard.contextTypes = {
  drizzle: PropTypes.object
}

export default connect(mapStateToProps, actions)(PlantDashboard);


{/* <UnverifiedDeliveries unverifiedDeliveries={this.state.unverifiedDeliveries} handleDropdownChange={this.handleDropdownChange}/>
<label>Enter your count to verify the selected delivery:</label>
<input value={this.state.count}
  onChange={e => this.onInputChange(e.target.value)} />          
<button onClick={this.verifyLatestDeliveries}>Verify Latest Deliveries</button>
<button onClick={this.reconcileDiscrepancies}>View and Reconcile Discrepancies</button> */}