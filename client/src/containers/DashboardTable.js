import React, { Component } from 'react';
import ChainRecordModal from './ChainRecordModal';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import FullModal from './FullModal';
const moment = require('moment');


class DashboardTable extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  };

  render () {
    return (
      <>
      {this.props.isFetching ? <span className="dashboard-spinner">Recording your transaction on the chain... <FontAwesomeIcon icon={faSpinner} spin /></span> :
      <table className="table table-dark dashboard-table">
        <thead>
          {tableHead(this.props.account_type)}
        </thead>
        <tbody>
        {fullTableBody(this.props.deliveries, this.props.viewChainRecord, this.props.account_type, this.props.verifyDelivery)}
        </tbody>
      </table>
    }
    </>
        )
  }

} 

  const NotVerified = () => {
    return (<span className="yellow-circle"></span>)
  }

  const VerifiedNoDiscrepancy = () => {
    return (<span className="green-circle"></span>)
  }

  const VerifiedDiscrepancy = () => {
    return (<span className="red-circle"></span>)
  }

  const TableRow = ({ delivery, viewChainRecord, account_type, verifyDelivery }) => {
    console.log(delivery);
    const {id, center_count, date_time, discrepancy, plant_count, verified, contract_id, name } = delivery;
    if (account_type === "Center") {
      return (
        <tr key ={id}>
          <td className = "align-middle">{!verified ? <NotVerified /> : discrepancy ? <VerifiedDiscrepancy /> : <VerifiedNoDiscrepancy /> }</td>
          <td className = "align-middle">{moment(date_time).format('MMM D YYYY, h:mm a')}</td>
          <td className = "align-middle count">{center_count}</td>
          <td className = "align-middle count">{verified ? plant_count : '-'}</td>
          <td className = "align-middle count">{verified ? discrepancy : '-'}</td>
          <td className = "align-middle"><ChainRecordModal className="modal-lg modal-dialog modal-dialog-centered" dbDiscrepancy={discrepancy} deliveryId={contract_id} viewChainRecord={viewChainRecord} contract_id={contract_id} /></td>
        </tr>
      )
    } else {
      return (
        <tr key ={id}>
          <td className = "align-middle">{!verified ? <FullModal account_type={account_type} onClickFunc={verifyDelivery} contract_id={contract_id}buttonLabel="Verify Delivery"/>          
                                                      : discrepancy ? <VerifiedDiscrepancy /> : <VerifiedNoDiscrepancy /> }</td>
          <td className = "align-middle">{name}</td>
          <td className = "align-middle">{moment(date_time).format('MMM D YYYY, h:mm a')}</td>
          <td className = "align-middle count">{verified ? center_count : '-'}</td>
          <td className = "align-middle count">{verified ? plant_count : '-'}</td>
          <td className = "align-middle count">{verified ? discrepancy : '-'}</td>
          <td className = "align-middle"><ChainRecordModal className="modal-lg modal-dialog modal-dialog-centered" dbDiscrepancy={discrepancy} deliveryId={contract_id} name={name} viewChainRecord={viewChainRecord} contract_id={contract_id} /></td>
        </tr>
      )
    }
    
  }

  const fullTableBody = (deliveries, viewChainRecord, account_type, verifyDelivery) => deliveries.map((delivery, index) => {
    return (<TableRow key={index} delivery={delivery} viewChainRecord={viewChainRecord} account_type={account_type} verifyDelivery={verifyDelivery}/>) 
  })

  const tableHead = (account_type) => {
    if (account_type === "Center") {
      return (
      <tr>
        <th scope="col">Status</th>
        <th scope="col">Time Submitted</th>
        <th scope="col">Your Count</th>
        <th scope="col">Plant Count</th>
        <th scope="col">Discrepancy</th>
        <th scope="col">Chain Record</th>
      </tr>
      )
    } else {
      return (
        <tr>
          <th scope="col">Status</th>
          <th scope="col">Center</th>
          <th scope="col">Time Submitted</th>
          <th scope="col">Center Count</th>
          <th scope="col">Your Count</th>
          <th scope="col">Discrepancy</th>
          <th scope="col">Chain Record</th>
        </tr>
        )
    }
  }

const mapStateToProps = state => {
 return {
  isFetching: state.fetchingReducer.isFetching
 }
}

export default connect(mapStateToProps)(DashboardTable);