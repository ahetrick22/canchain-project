import React, { Component } from 'react';
import ModalContent from '../components/ModalContent';


class Modal extends Component {

  render ()  {
    return (
      <>
    <button>This is a button to trigger the Modal</button>
    <ModalContent />
      </>
  )}
}

export default Modal;