import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PlantVerifyModal from '../components/PlantVerifyModal';
import CenterVerifyModal from '../components/CenterVerifyModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

//creates the modal that shows a full chain record
class ChainRecordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      centerAddress: null,
      plantAddress: null,
      centerCount: 0,
      plantCount: 0,
      centerDt: 0,
      plantDt: 0,
      centerBn: 0,
      plantBn: 0, 
      chainDiscrepancy: 0
    };
  }

  componentDidMount = async () => {
    //view the chain record by calling the contract function at the selected contract ID (passed from the row)
    const chainRecord = await this.props.viewChainRecord(this.props.contract_id);
    //once it comes, grab all the data and set it to the state of this modal
    const { centerAddress, plantAddress, centerCount, plantCount, centerDt, plantDt, centerBn, plantBn } = await chainRecord; 
    await this.setState({
      centerAddress,
      plantAddress,
      centerCount,
      plantCount,
      centerDt,
      plantDt,
      centerBn,
      plantBn,
      chainDiscrepancy: Math.abs(plantCount - centerCount)
    });
  }

  //toggle modal showing
  toggle =  () => {
    this.setState({
      modal: !this.state.modal, 
    });
  }

  render() {
    const {centerAddress,
      plantAddress,
      centerCount,
      plantCount,
      centerDt,
      plantDt,
      centerBn,
      plantBn,
      chainDiscrepancy
    } = this.state;
    if (centerBn !== 0) {
        return (
          <>
          <div className="btn btn-info" onClick={this.toggle}>Query Chain</div>
          <Modal className={this.props.className} isOpen={this.state.modal} toggle={this.toggle} >
        <ModalHeader className="chain-record-modal-header" toggle={this.toggle}>Chain Record for Contract ID #{this.props.contract_id}, Delivery ID #{this.props.deliveryId} {this.props.name ? <> from center: {this.props.name}</> : <></>}</ModalHeader>
            <ModalBody className="chain-record-modal-body">
              {
                Number(plantBn) === 0 ?
                <>
                <div className="yellow-circle"></div><span>   Awaiting Plant Verification</span><br />
                <CenterVerifyModal centerAddress={centerAddress} centerCount={centerCount} 
                centerDt={centerDt} centerBn={centerBn}/> 
                </> :
                <PlantVerifyModal centerAddress={centerAddress} plantAddress={plantAddress} centerCount={centerCount} plantCount = {plantCount}
                centerDt={centerDt} plantDt={plantDt} centerBn={centerBn} plantBn={plantBn} chainDiscrepancy={chainDiscrepancy} dbDiscrepancy={this.props.dbDiscrepancy}/>
              }
            </ModalBody>
            <ModalFooter className="chain-record-modal-footer">
              <Button color="primary" onClick={this.toggle}>Ok</Button>
            </ModalFooter>
          </Modal>
          </>
        )
    } else {
      return (
        <FontAwesomeIcon icon={faSpinner} spin />
      )
    }
  }
}

export default ChainRecordModal;