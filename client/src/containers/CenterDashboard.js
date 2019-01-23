import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import DashboardHeader from '../components/DashboardHeader';
import PropTypes from 'prop-types';
import DashboardTable from '../components/DashboardTable';
import FullModal from './FullModal';
import { Redirect } from 'react-router-dom';

class CenterDashboard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      user: null,
      confirmed: false,
      confirmationString: '', 
      deliveries: []
    }
    this.contract = context.drizzle.contracts.BagCount;
  }

  componentDidMount = async () => {
    await this.viewDeliveries();
  }

  createDelivery = async (count) => {
    //the center that is creating the delivery
    const deliveryInfo = {
      centerId: this.state.user.id,
      centerCount: count
    }
    // send the current count to the contract (center address comes from web3 injection)
    this.contract.methods.recordCount(count).send()
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
            this.setState({confirmationString: `Your transaction is confirmed with a bag count of ${count} and contract ID of ${data.contractId}.`})
            this.viewDeliveries();
          })
      })
  }

  viewDeliveries = () => {
    this.setState( { deliveries: [] } );
    fetch(`/deliveries/${this.props.user.id}`,
    {
      headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(res => res.json())
      .then(data => {
        data.forEach(item => {
          this.setState( {deliveries: this.state.deliveries.concat([item]) });
        })
      })
    .catch(error => {
      console.log(error);
    });  
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
            <DashboardHeader account_type={account_type}/>
            <FullModal account_type={account_type} onClickFunc={this.createDelivery} buttonLabel="Create New Delivery"/>          
            <DashboardTable viewChainRecord={this.viewChainRecord} account_type={account_type} deliveries={this.state.deliveries} />
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

CenterDashboard.contextTypes = {
  drizzle: PropTypes.object
}

export default connect(mapStateToProps, actions)(CenterDashboard);
