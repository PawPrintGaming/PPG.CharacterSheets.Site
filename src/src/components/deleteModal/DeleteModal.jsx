import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import './DeleteModal.css';

export class DeleteModal extends Component {
  render() {
    const {onDelete, onToggle, isOpen} = this.props
    return (
      <Modal isOpen={isOpen} toggle={() => this.toggle()}>
        <ModalHeader>Delete Character?</ModalHeader>
        <ModalBody>
          {this.props.children}
          <Alert color={"danger"}>WARNING: This action cannot be undone.</Alert>
        </ModalBody>
        <ModalFooter>
          <Button color={"danger"} onClick={() => {onDelete(); onToggle()}}>Delete</Button>
          <Button color={"secondary"} onClick={() => onToggle()}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default DeleteModal