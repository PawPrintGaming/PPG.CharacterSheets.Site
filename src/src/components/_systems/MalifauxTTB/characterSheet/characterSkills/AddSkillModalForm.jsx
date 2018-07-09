import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addCharacterSkill} from '../../../../characterSheet/updateCharacterSheetInvocations';
import {Button, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Field, reduxForm, formValueSelector} from 'redux-form'

export class AddSkillModalForm extends Component {
  renderOptionWithRespectToExistingSkills = (characterSkills, skillInfo) => (
    characterSkills.some(skill => skill.name === skillInfo.name)
          ? null
          : <option key={skillInfo.name} value={skillInfo.name} label={skillInfo.name} />
  )

  renderSkillNamesForNoCategory = (skillInfoSets, characterSkills) => (
    skillInfoSets.map(skillInfoSet =>
      skillInfoSet.value.map(skillInfo =>
        this.renderOptionWithRespectToExistingSkills(characterSkills, skillInfo)
      )
    )
  )

  renderSkillNamesForCategory = (skillInfoSets, characterSkills, addSkillSelectedCategory) => (
    skillInfoSets.find(skillInfoSet =>
      skillInfoSet.key === addSkillSelectedCategory).value.map(skillInfo =>
        this.renderOptionWithRespectToExistingSkills(characterSkills, skillInfo
      )
    )
  )

  render() {
    const {modalIsOpen, toggleModalOpen, pristine, submitting, onAddSkill, skillInfoSets, characterSkills, formValues} = this.props;
    return (
      <Modal isOpen={modalIsOpen} toggle={toggleModalOpen} className={"addSkillModalMalifaux"}>
          <ModalHeader toggle={toggleModalOpen}>Add a New Skill</ModalHeader>
          <ModalBody>
            <InputGroup>
              <InputGroupAddon addonType={"prepend"}>Skill Category</InputGroupAddon>
              <Field name={"category"} component={"select"} className={"form-control"}>
                <option />
                {
                  skillInfoSets.map(skillInfoSet => 
                    skillInfoSet.value.every(skillInfo => characterSkills.some(skill => skill.name === skillInfo.name))
                      ? null
                      : <option key={skillInfoSet.key} value={skillInfoSet.key} label={skillInfoSet.key} />
                  )
                }
              </Field>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType={"prepend"}>Skill Name</InputGroupAddon>
              <Field name={"skillName"} component={"select"} className={"form-control"}>
                <option />
                {
                  formValues.category
                    ? this.renderSkillNamesForCategory(skillInfoSets, characterSkills, formValues.category)
                    : this.renderSkillNamesForNoCategory(skillInfoSets, characterSkills)
                }
              </Field>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType={"prepend"}>Skill Rank</InputGroupAddon>
                <Field name={"skillRank"} component={"input"} type={"number"} className={"form-control"} />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color={"primary"} disabled={pristine || submitting} onClick={() => {onAddSkill(formValues); toggleModalOpen(); return false}}>Add</Button>
            <Button color={"secondary"} onClick={toggleModalOpen}>Cancel</Button>
          </ModalFooter>
      </Modal>
    )
  }
}

AddSkillModalForm.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  toggleModalOpen: PropTypes.func.isRequired,
  onAddSkill: PropTypes.func.isRequired,
  skillInfoSets: PropTypes.array.isRequired,
  characterId: PropTypes.string.isRequired,
  characterSkills: PropTypes.array.isRequired,
  formValues: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  const selector = formValueSelector('addCharacterSkillMalifaux');
  return {
    formValues: {
      category: selector(state, 'category'),
      skillName: selector(state, 'skillName'),
      skillRank: selector(state, 'skillRank')
    }
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddSkill: addCharacterSkill('addCharacterSkillMalifaux', dispatch, props.characterId)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'addCharacterSkillMalifaux'})(AddSkillModalForm))