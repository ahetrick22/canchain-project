import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class FullModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      count: 0,
      invalidCount: false
    };
  }

  //toggle modal
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  //execute the delivery action (either create or verify) and close the modal
  primaryButtonClick = () => {
    if (!isNaN(Number(this.state.count))) {
      this.setState({ invalidCount: false });
      if (this.props.contract_id) {
        this.props.onClickFunc(this.props.contract_id, this.state.count);
      } else {
        this.props.onClickFunc(this.state.count);
      }
      this.toggle();
    } else {
      this.setState({ invalidCount: true });
    }
  }

  //use to get the correct count for a delivery
  onInputChange = count => {
    this.setState({ count });
  }

  render() {
    return (
      <div>
        <div className={this.props.account_type=== "Center" ? "btn btn-success create-delivery" : "btn btn-success"} onClick={this.toggle}>{this.props.buttonLabel}</div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader className="chain-record-modal-header" toggle={this.toggle}>{this.props.account_type=== "Center" ? 'Create New Delivery' : `Verify Delivery # ${this.props.id}`}</ModalHeader>
          <ModalBody className="chain-record-modal-body">
          {this.state.invalidCount ? <div className="alert alert-danger" role="alert">
                Count must be a number. Please try again.
                </div> : <></>}
            <label>Enter your count:</label>
            <input value={this.state.count}
            onChange={e => this.onInputChange(e.target.value)} /> 
          </ModalBody>
          <ModalFooter className="chain-record-modal-footer">
            <Button color="primary" onClick={this.primaryButtonClick}>{this.props.account_type=== "Center" ? 'Submit This Delivery' : `Verify This Delivery`}</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FullModal;