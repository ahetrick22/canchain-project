import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class PlantDashboardHeader extends Component {
  
  state = {
    selectedCenter: '',
    selectedDeliveryView: '',
    centers: [],
    centerDropdownOpen: false,
    filterDropdownOpen: false
  };

  //get the centers to build the dropdown
  componentDidMount = () => {
    fetch('/centers', {
      headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(res => res.json())
      .then(data => {
        this.setState({ centers: this.state.centers.concat([...data])});
      })
      .catch(error => {
        console.log(error);
      });

    }

    //add any params about delivery status to the delivery request
    updateDeliveryView = async (viewOption) => {
      await this.setState({selectedDeliveryView: viewOption});
      await this.getUpdatedDeliveries();
    }

    //add params about which center to view to the delivery request
    updateSelectedCenter = async (centerOption) => {
      await this.setState({selectedCenter: centerOption});
      await this.getUpdatedDeliveries();
    }

    getUpdatedDeliveries = () => {
      this.props.getDeliveries(`${this.state.selectedCenter}${this.state.selectedDeliveryView}`);
    }
  
  //toggle the dropdown views
  centerToggle = () => {
    this.setState({
      centerDropdownOpen: !this.state.centerDropdownOpen
    });
  }

  filterToggle = () => {
    this.setState({
      filterDropdownOpen: !this.state.filterDropdownOpen
    });
  }

  render () {
    return (
      <>
    <ButtonDropdown isOpen={this.state.centerDropdownOpen} toggle={this.centerToggle}>
        <DropdownToggle caret>
        Select a Center
        </DropdownToggle>
        <DropdownMenu>
        <DropdownItem onClick={() => this.updateSelectedCenter("")} >All Centers</DropdownItem>
        { this.state.centers.map(center => <CenterDropdownItem updateSelectedCenter={this.updateSelectedCenter} key={center.id} center={center} />) }
        </DropdownMenu>
      </ButtonDropdown>

        <ButtonDropdown isOpen={this.state.filterDropdownOpen} toggle={this.filterToggle}>
        <DropdownToggle caret>
        Filter
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => this.updateDeliveryView("")} >All Deliveries</DropdownItem>
          <DropdownItem onClick={() => this.updateDeliveryView(`?unverified=true`)}>Unverified Deliveries</DropdownItem>
          <DropdownItem onClick={() => this.updateDeliveryView(`?verified=true`)}>Verified Deliveries</DropdownItem>
          <DropdownItem onClick={() => this.updateDeliveryView(`?discrepancy=true`)}>Deliveries with Discrepancy</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
     
     <button className="btn btn-primary pull-left" onClick={() => this.props.getDeliveries(this.props.paramStr)}>Get Latest Mined Transactions</button>
    </>
    )
  }
}

//for each center, build an item that will update the selected one to that before the next delivery request
const CenterDropdownItem = ({ center, updateSelectedCenter }) => {
  const {name, id} = center;
  return (
    <DropdownItem onClick={() => updateSelectedCenter(`/${id}`)} >{name}</DropdownItem>
    )
}

const mapStateToProps = state => {
  return {
    paramStr: state.deliveryReducer.paramStr
  }
}


export default connect(mapStateToProps, actions)(PlantDashboardHeader);
