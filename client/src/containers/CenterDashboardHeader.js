import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class CenterDashboardHeader extends Component {
    state = {
      dropdownOpen: false
    };


  updateDeliveryParams = async (paramStr) => {
    await this.props.setDeliveryParams(paramStr);
    await this.props.getDeliveries(this.props.paramStr);
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render () {
    const { id } = this.props.user
    return (
      <>
     <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
        Filter
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => this.updateDeliveryParams(`/${id}`)} >All Deliveries</DropdownItem>
          <DropdownItem onClick={() => this.updateDeliveryParams(`/${id}?unverified=true`)}>Unverified Deliveries</DropdownItem>
          <DropdownItem onClick={() => this.updateDeliveryParams(`/${id}?verified=true`)}>Verified Deliveries</DropdownItem>
          <DropdownItem onClick={() => this.updateDeliveryParams(`/${id}?discrepancy=true`)}>Deliveries with Discrepancy</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
     
     <button className="btn btn-primary pull-left" onClick={() => this.props.getDeliveries(this.props.paramStr)}>Get Latest Mined Transactions</button>
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
