import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

//shows the filters and options at the top of the dashboard
class CenterDashboardHeader extends Component {
    state = {
      dropdownOpen: false
    };

  //when a filter is applied, it updates the parameter string for fetching deliveries and then gets them
  updateDeliveryParams = async (paramStr) => {
    await this.props.setDeliveryParams(paramStr);
    await this.props.getDeliveries(this.props.paramStr);
  }

  //opens and closes the dropdown per bootstrap requirements
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render () {
    const { id } = this.props.user
    return (
      <>
           <p className="center">New delivery: wait for notification that it has mined, and then get mined transactions.</p>

       <>
    <div className="dropdown dropleft ">
  <button className="btn btn-secondary dropdown-toggle center-filter" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Filter
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button className="dropdown-item btn-block" type="button" onClick={() => this.updateDeliveryParams(`/${id}`)} >All Deliveries</button>
    <button className="dropdown-item btn-block" type="button"onClick={() => this.updateDeliveryParams(`/${id}?unverified=true`)}>Unverified Deliveries</button>
    <button className="dropdown-item btn-block" type="button"onClick={() => this.updateDeliveryParams(`/${id}?verified=true`)}>Verified Deliveries</button>
    <button className="dropdown-item btn-block" type="button"onClick={() => this.updateDeliveryParams(`/${id}?discrepancy=true`)}>Deliveries with Discrepancy</button>

  </div>
</div>
        </>
     
     <button className="btn btn-primary pull-left" onClick={() => this.props.getDeliveries(this.props.paramStr)}>Mined Transactions</button>
    </>
    )
  }
}

const mapStateToProps = state => {
  return {
    paramStr: state.deliveryReducer.paramStr,
    user: state.authReducer.user
  }
}

export default connect(mapStateToProps, actions)(CenterDashboardHeader);
