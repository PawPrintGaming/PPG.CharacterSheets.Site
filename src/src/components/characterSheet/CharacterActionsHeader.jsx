import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Alert, Button, Col, Container, Modal, ModalHeader, ModalBody, ModalFooter, Row} from 'reactstrap';
import './CharacterActionsHeader.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import deleteCharacterIcon from '@fortawesome/fontawesome-free-regular/faTrashAlt';
import {deleteCharacter} from './characterActionsHeaderInvocations';

export class CharacterActionsHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteCharacterModal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(toggle) {
    this.setState({
      ...this.state,
      [toggle]: !this.state[toggle]
    });
  }

  deleteCharacterToggle = () => this.toggle('deleteCharacterModal');

  render() {
    const {character, onCharacterDelete, history} = this.props;
    return (
      <Container className={"characterActionsHeader"}>
        <Col>
          <Row className={"characterActionsPanel"}>
            <FontAwesomeIcon icon={deleteCharacterIcon} className={"characterActionIcon"} onClick={() => this.deleteCharacterToggle()}/>
            <Modal isOpen={this.state.deleteCharacterModal} toggle={() => this.deleteCharacterToggle()}>
              <ModalHeader>Delete Character?</ModalHeader>
              <ModalBody>
                <Col>
                  <Row>Are you sure you wish to delete the character:</Row>
                  <Row className={"characterName"}>{`${character.characterName}`}</Row>
                </Col>
                <Alert color={"danger"}>WARNING: This action cannot be undone.</Alert>
              </ModalBody>
              <ModalFooter>
                <Button color={"danger"} onClick={() => {onCharacterDelete(character.id, history); this.deleteCharacterToggle()}}>Delete</Button>
                <Button color={"secondary"} onClick={() => this.deleteCharacterToggle()}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </Row>
        </Col>
      </Container>
    )
  }
}

CharacterActionsHeader.propTypes = {
  character: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onCharacterDelete: PropTypes.func.isRequired
}

const mapStateToDispatch = (dispatch) => {
  return {
    onCharacterDelete: (id, history) => {
      deleteCharacter(id, history)
    }
  }
}

export default withRouter(connect(mapStateToDispatch)(CharacterActionsHeader))