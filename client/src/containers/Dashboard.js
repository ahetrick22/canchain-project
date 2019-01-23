import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DashboardTable from './DashboardTable';
import FullModal from './FullModal';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      web3AccountMatch: true
    }
    this.contract = context.drizzle.contracts.BagCount;
  }
  

  componentDidMount = () => {
    if (this.props.user) {
      if (this.props.user.account_type === "Center") {
        this.props.getDeliveriesForSingleCenter(this.props.user.id);
      } else {
        this.props.getDeliveriesForPlant();
      }
      this.context.drizzle.web3.eth.getAccounts().then(result => {
        if (this.props.user.account_address !== result[0].toLowerCase()) {
          this.setState( {web3AccountMatch: false} )
        }
      })
    }
  }

  createDelivery = async (count) => {
    this.props.toggleFetch();
    //the center that is creating the delivery
    const deliveryInfo = {
      centerId: this.props.user.id,
      centerCount: count
    }
    // send the current count to the contract (center address comes from web3 injection)
    await this.contract.methods.recordCount(count).send()
      .then(async (data) => {
        //this is the delivery id from the contract, which will need to be referenced for the plant to verify it
        deliveryInfo.contractId = data.events.LogCenterDelivery.returnValues.id;
        //send the delivery to the SQL DB
        await this.props.createDelivery(deliveryInfo);
      })
    await this.props.getDeliveriesForSingleCenter(this.props.user.id);
  }

  verifyDelivery = (contract_id, count) => {
    this.props.toggleFetch();
    //show them a modal to be able to put in the plant count & verify
    //send the verifyCount method & also update the DB
    const deliveryVerification = {
      contract_id : contract_id,
      plantCount: count
    }
    this.contract.methods.verifyDelivery(contract_id, count).send()
      .then(data => {
        //this is the discrepancy emitted from the contract
        deliveryVerification.discrepancy = data.events.Discrepancy.returnValues.difference;
        this.props.verifyDelivery(deliveryVerification);
      })
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
    } else if (!this.state.web3AccountMatch) {
      const { account_type } = this.props.user;
      return (
        <div className="main-class">
        <div className ="container">
         <div className = "row">
           <div className="col dashboard-page">
           <h1><strong>{account_type} Dashboard</strong></h1>         
           <h3>You must log in to your Metamask account, {this.props.user.account_address}, to interact with the chain. Please switch your Metamask account and refresh the page. </h3>
   </div>
   </div>
   </div>
   </div>
      )
    } else {
      const { account_type } = this.props.user;
      return(
        <div className="main-class">
           <div className ="container">
            <div className = "row">
              <div className="col dashboard-page">
              <h1><strong>{account_type} Dashboard</strong></h1> 
            {account_type === "Center" ?  
            <>          
            <FullModal account_type={account_type} onClickFunc={this.createDelivery} buttonLabel="Create New Delivery"/>          
            <DashboardTable viewChainRecord={this.viewChainRecord} account_type={account_type} deliveries={this.props.deliveries} /> 
            </> 
            :
            <DashboardTable verifyDelivery={this.verifyDelivery} viewChainRecord={this.viewChainRecord} account_type={account_type} deliveries={this.props.deliveries} />
            }
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
    user: state.authReducer.user,
    deliveries: state.deliveryReducer.deliveries
  }
}

Dashboard.contextTypes = {
  drizzle: PropTypes.object
}

export default connect(mapStateToProps, actions)(Dashboard);
