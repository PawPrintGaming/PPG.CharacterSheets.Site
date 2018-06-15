import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Alert, Button, Col, Container, Modal, ModalHeader, ModalBody, ModalFooter, Row} from 'reactstrap';
import Switch from '../switch/Switch';
import './CharacterActionsHeader.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import squareBackIcon from '@fortawesome/fontawesome-free-solid/faSquare';
import showEditableIconBase from '@fortawesome/fontawesome-free-solid/faPenSquare';
import showEditableIconOn from '@fortawesome/fontawesome-free-regular/faEye';
import showEditableIconOff from '@fortawesome/fontawesome-free-regular/faEyeSlash';
import refreshCharacterIcon from '@fortawesome/fontawesome-free-solid/faSyncAlt';
import deleteCharacterIcon from '@fortawesome/fontawesome-free-solid/faUserTimes';
import {getCharacter, deleteCharacter} from './characterActionsHeaderInvocations';
import {switchShowEditableAction} from '../../ducks/userOptions';

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
    const {character, onShowEditableSwitch, onCharacterRefresh, onCharacterDelete, showEditable, history} = this.props;
    return (
      <Container className={"characterActionsHeader"}>
        <Col>
          <Row className={"characterActionsPanel"}>
            <Col xs={1} className={"characterAction"}>
              <FontAwesomeIcon icon={showEditableIconBase} className={"characterActionIcon"} onClick={onShowEditableSwitch}/>
              <Switch on={showEditable} onClick={onShowEditableSwitch} onIcon={showEditableIconOn} offIcon={showEditableIconOff} />
            </Col>
            <Col xs={1} className={"characterAction fa-layers fa-fw"}>
              <FontAwesomeIcon icon={squareBackIcon} className={"characterActionIcon"} />
              <FontAwesomeIcon icon={refreshCharacterIcon} className={"characterActionIcon internal"} id={"refreshSpinner"} onClick={() => onCharacterRefresh("refreshSpinner", character.id)} />
            </Col>
            <Col xs={1} className={"characterAction fa-layers fa-fw"}>
              <FontAwesomeIcon icon={squareBackIcon} className={"characterActionIcon"} />
              <FontAwesomeIcon icon={deleteCharacterIcon} className={"characterActionIcon internal"} onClick={() => this.deleteCharacterToggle()} />
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
            </Col>
          </Row>
        </Col>
      </Container>
    )
  }
}

CharacterActionsHeader.propTypes = {
  showEditable: PropTypes.bool.isRequired,
  character: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onShowEditableSwitch: PropTypes.func.isRequired,
  onCharacterRefresh: PropTypes.func.isRequired,
  onCharacterDelete: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    showEditable: state.userOptions.showEditable
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onShowEditableSwitch: () => {
      dispatch(switchShowEditableAction());
    },
    onCharacterRefresh: (spinnerId, characterId) => {
      const elem = document.getElementById(spinnerId);
      console.log('send');
      elem.classList.add('fa-spin');
      getCharacter(characterId).then(() => {
        console.log('receive')
        elem.classList.remove('fa-spin');
      });
    },
    onCharacterDelete: (id, history) => {
      deleteCharacter(id, history);
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CharacterActionsHeader))