import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class FullModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      count: 0
    };
  }

  //toggle modal
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  //execute the delivery creation and close the modal
  primaryButtonClick = () => {
    console.log(this.props);
    if (this.props.contract_id) {
      this.props.onClickFunc(this.props.contract_id, this.state.count);
    } else {
      this.props.onClickFunc(this.state.count);
    }
    this.toggle();
  }

  //use to get the correct count for a delivery
  onInputChange = count => {
    this.setState({ count });
  }

  render() {
    return (
      <div>
        <div className="verify-button" onClick={this.toggle}>{this.props.buttonLabel}</div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} className="center">Create New Delivery</ModalHeader>
          <ModalBody>
            <label>Enter your count:</label>
            <input value={this.state.count}
            onChange={e => this.onInputChange(e.target.value)} /> 
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.primaryButtonClick}>Submit Delivery</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FullModal;