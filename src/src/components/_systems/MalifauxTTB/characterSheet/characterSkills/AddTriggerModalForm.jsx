import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Col, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, Row} from 'reactstrap';
import {updateCharacterSkill} from '../../../../characterSheet/updateCharacterSheetInvocations';
import {addTriggerTransform} from '../updateCharacterTransforms';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import SuitNames, {iconForSuit} from '../../_suits/suits';
import ExpandingTextAreaField from '../../../../inlineEditors/expandingTextAreaField/ExpandingTextAreaField';

export class AddTriggerModalForm extends Component {
  render() {
    const {modalIsOpen, toggleModalOpen, pristine, submitting, onAddTrigger, formValues} = this.props;
    return (
      <Modal isOpen={modalIsOpen} toggle={toggleModalOpen} className={"addSkillModalMalifaux"}>
          <ModalHeader toggle={toggleModalOpen}>Add a New Trigger</ModalHeader>
          <ModalBody>
            <InputGroup>
              <InputGroupAddon addonType={"prepend"}>Name</InputGroupAddon>
              <Field name={"name"} component={"input"} className={"form-control"} />
            </InputGroup>
            <InputGroup className={"addTriggerSet form-control-group"}>
                <InputGroupAddon addonType={"prepend"}>Suit </InputGroupAddon>
                  <Row className={"suitSelection"}>
                    <Col xs={2} className={"suitPair"}><label><Field name={"suit"} component={"input"} type={"radio"} value={SuitNames.crows}/>{iconForSuit(SuitNames.crows)}</label></Col>
                    <Col xs={2} className={"suitPair"}><label><Field name={"suit"} component={"input"} type={"radio"} value={SuitNames.masks}/>{iconForSuit(SuitNames.masks)}</label></Col>
                    <Col xs={2} className={"suitPair"}><label><Field name={"suit"} component={"input"} type={"radio"} value={SuitNames.rams}/>{iconForSuit(SuitNames.rams)}</label></Col>
                    <Col xs={2} className={"suitPair"}><label><Field name={"suit"} component={"input"} type={"radio"} value={SuitNames.tomes}/>{iconForSuit(SuitNames.tomes)}</label></Col>
                  </Row>
              </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType={"prepend"}>Description</InputGroupAddon>
                <ExpandingTextAreaField name={"description"} className={"form-control"}/>
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color={"primary"} disabled={pristine || submitting} onClick={() => {onAddTrigger(formValues); toggleModalOpen(); return false}}>Add</Button>
            <Button color={"secondary"} onClick={toggleModalOpen}>Cancel</Button>
          </ModalFooter>
      </Modal>
    )
  }
}

AddTriggerModalForm.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  toggleModalOpen: PropTypes.func.isRequired,
  onAddTrigger: PropTypes.func.isRequired,
  skill: PropTypes.object.isRequired,
  characterId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  const selector = formValueSelector('addCharacterSkillTriggerMalifaux');
  return {
    formValues: {
      name: selector(state, 'name'),
      suit: selector(state, 'suit'),
      description: selector(state, 'description')
    }
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddTrigger: (formVales) => updateCharacterSkill(props.characterId, addTriggerTransform(props.skill, formVales))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'addCharacterSkillTriggerMalifaux'})(AddTriggerModalForm))