import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Col, Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, Row, Tooltip} from 'reactstrap';
import AddSkillModalForm from './AddSkillModalForm';
import AddTriggerModalForm from './AddTriggerModalForm';
import BlockHeader from '../blockHeader/BlockHeader';
import Switch from '../../../../switch/Switch';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import showSkillsBySetIcon from '@fortawesome/fontawesome-free-solid/faTable';
import showSkillsByOwnershipIcon from '@fortawesome/fontawesome-free-solid/faAlignJustify';
import addSkillIcon from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import skillGroupCloseIcon from '@fortawesome/fontawesome-free-solid/faCaretDown';
import skillGroupOpenIcon from '@fortawesome/fontawesome-free-solid/faCaretUp';
import skillGroupCloseAllIcon from '@fortawesome/fontawesome-free-solid/faAngleDoubleDown';
import skillGroupOpenAllIcon from '@fortawesome/fontawesome-free-solid/faAngleDoubleUp';
import addTriggerIcon from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import {iconForSuit} from '../../_suits/suits';
import InlineTextEditor from '../../../../inlineEditors/textEditors/InlineTextEditor';
import {updateCharacterSkill} from '../../../../characterSheet/updateCharacterSheetInvocations';
import {deleteTriggerTransform, updateTriggerDescriptionTransform, updateSkillRankTransform} from '../updateCharacterTransforms';
import {despace} from '../../../../../metaDataUtils';
import {DeleteModal} from '../../../../deleteModal/DeleteModal';

export class CharacterSkills extends Component {
  constructor(props) {
    super(props)

    let collapse = {};
    props.skillInfoSets.forEach(skillInfoSet => collapse = this.registerCollapse(collapse, skillInfoSet.key))

    this.state = {
      showSkillsBySet: false,
      setDropDownOpen: false,
      activeSkillSet: props.skillInfoSets[0].key,
      addSkillCategory: null,
      collapse: collapse,
      tooltips: {},
      modals: {}
    }
  }

  toggleShowSkills = () => {
    this.setState({
      showSkillsBySet: !this.state.showSkillsBySet
    });
  }

   toggleSetDropDownOpen = () => {
     this.setState({
      setDropDownOpen: !this.state.setDropDownOpen
     });
   }

  selectTab = (key) => {
    this.setState({
      activeSkillSet: key
    });
  }

  registerCollapse = (collapse, key) => {
    collapse = {
      ...collapse,
      [key]: true
    }
    return collapse
  }

  toggleCollapse = (key) => {
    this.setState({
      collapse: {
        ...this.state.collapse,
        [key]: !this.state.collapse[key]
      }
    })
  }

  toggleCollapseAll = (value) => {
    let collapse = this.state.collapse
    Object.getOwnPropertyNames(collapse).forEach(prop => collapse[prop] = value)
    this.setState({
      collapse: collapse
    })
  }

  toggleTooltip = (key) => {
    this.setState({
      tooltips: {
        ...this.state.tooltips,
        [key]: !(this.state.tooltips[key] || false)
      }
    })
  }

  toggleModal = (key) => {
    this.setState({
      modals: {
        ...this.state.modals,
        [key]: !(this.state.modals[key] || false)
      }
    })
  }

  renderSkillViewToggle = () => (
    <Row className={"skillsViewToggle"}>
      <FontAwesomeIcon icon={showSkillsBySetIcon} /><Switch on={this.state.showSkillsBySet} onClick={() => this.toggleShowSkills()}/><FontAwesomeIcon icon={showSkillsByOwnershipIcon} />
    </Row>
  )

  renderSkillsHeader = () => (
    <Row className={"skillsHeader"}>
      <Col xs={4} className={" skillsHeaderValue name"}>Name</Col>
      <Col xs={1} className={" skillsHeaderValue"}>AV</Col>
      <Col xs={2} className={" skillsHeaderValue"}>Rating</Col>
      <Col xs={2} className={" skillsHeaderValue"}>Aspect</Col>
      <Col xs={3} className={" skillsHeaderValue"}>Triggers</Col>
    </Row>
  )

  renderSkillViewFooter = (skillInfoSets, characterId, characterSkills) => (
    <Row className={"skillsViewFooter"}>
      <Col>
        <FontAwesomeIcon icon={addSkillIcon} onClick={() => this.toggleModal('addSkill')}/>
        <AddSkillModalForm modalIsOpen={this.state.modals['addSkill'] || false} toggleModalOpen={() => this.toggleModal('addSkill')} skillInfoSets={skillInfoSets} characterId={characterId} characterSkills={characterSkills}/>
      </Col>
    </Row>
  )

  renderTriggers = (skill, triggers, onDeleteTrigger, onUpdateTriggerDescription) => (
    !triggers
      ? null
      : triggers.value.map(trigger => {
        const suit = trigger.value.find(prop => prop.key === 'suit').value;
        const description = trigger.value.find(prop => prop.key === 'description').value;
        return (
          <span key={trigger.key} id={despace(trigger.key)} className={"skillTrigger"} onClick={() => this.toggleModal(trigger.key)}>
            {iconForSuit(suit)}
            <Tooltip placement={"bottom"} isOpen={this.state.tooltips[trigger.key] || false} target={despace(trigger.key)} toggle={() => this.toggleTooltip(trigger.key)}>{trigger.key}</Tooltip>
            <Modal isOpen={this.state.modals[trigger.key]} toggle={() => this.toggleModal(trigger.key)}>
              <ModalHeader toggle={() => this.toggleModal(trigger.key)}>{iconForSuit(suit)}{trigger.key}</ModalHeader>
              <ModalBody>
                <InlineTextEditor text={description} param={trigger.key} editingElement={"textarea"} change={({text}) => onUpdateTriggerDescription(skill, trigger.key, text)}/>
              </ModalBody>
              <ModalFooter>
                <Button color={"danger"} onClick={() => this.toggleModal(`${trigger.key}-delete`)}>Delete</Button>
                <DeleteModal onDelete={() => onDeleteTrigger(skill, trigger.key)} onToggle={() => this.toggleModal(`${trigger.key}-delete`)} isOpen={this.state.modals[`${trigger.key}-delete`] || false}>
                  <Col>
                    <Row>Are you sure you wish to delete the trigger:</Row>
                    <Row className={"modalStandout"}>{`${trigger.key}`}</Row>
                  </Col>
                </DeleteModal>
                <Button color={"primary"} onClick={() => this.toggleModal(trigger.key)}>Done</Button>
              </ModalFooter>
            </Modal>
          </span>
        )
      }
    )
  )

  renderSkill = (characterId, skillInfo, skill, stats, onUpdateTriggerDescription, onDeleteTrigger, onUpdateCharacterSkillRank) => (
    skill
      ? skillInfo.statKeys.map(statKey => (
          <Row key={`${skillInfo.name}-${statKey}`} className={"skill"}>
            <Col xs={4} className={"skillValue name"}>{skill.name}</Col>
            <Col xs={1} className={"skillValue"}>{stats.find(stat => stat.key === statKey).value+skill.rank}</Col>
            <Col xs={2} className={"skillValue"}><InlineTextEditor text={skill.rank} param={skill.name} change={({text}) => onUpdateCharacterSkillRank(skill, text)} inputType={"number"}/></Col>
            <Col xs={2} className={"skillValue"}>{statKey}</Col>
            <Col xs={3} className={"skillValue triggers"}>
              <Row>
                <Col>
                  {this.renderTriggers(skill, skill.metaData ? skill.metaData.find(data => data.key === 'triggers') : null, onDeleteTrigger, onUpdateTriggerDescription)}
                </Col>
                <Col xs={4} className={"addTrigger"}>
                  <FontAwesomeIcon icon={addTriggerIcon} className={"addTriggerIcon"} onClick={() => this.toggleModal(`addtrigger-${skillInfo.name}`)} />
                  <AddTriggerModalForm modalIsOpen={this.state.modals[`addtrigger-${skillInfo.name}`] || false} toggleModalOpen={() => this.toggleModal(`addtrigger-${skillInfo.name}`)} skill={skill} characterId={characterId} />
                </Col>
              </Row>
            </Col>
          </Row>
        ))
      : null
  )

  renderSkillsBySet = (skillInfoSets, skills, stats, characterId, onUpdateTriggerDescription, onDeleteTrigger, onUpdateCharacterSkillRank) => (
    <Row className={"skillsView"}>
      <Col xs={8} className={"skillsViewHeader"}>
        <Dropdown isOpen={this.state.setDropDownOpen} toggle={this.toggleSetDropDownOpen}>
          <DropdownToggle caret>
            {this.state.activeSkillSet}
          </DropdownToggle>
          <DropdownMenu>
            {
              skillInfoSets.map(skillInfoSet =>
                <DropdownItem key={skillInfoSet.key} disabled={skillInfoSet.key === this.state.activeSkillSet} onClick={() => this.selectTab(skillInfoSet.key)}>{skillInfoSet.key}</DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </Col>
      <Col xs={4} className={"skillsViewHeader"}>
        {this.renderSkillViewToggle()}
      </Col>
      <Col xs={12} className={"skillsViewTable"}>
        {this.renderSkillsHeader()}
        {
          skills.some(skill => skillInfoSets.find(skillInfoSet => skillInfoSet.key === this.state.activeSkillSet).value.some(skillInfo => skillInfo.name === skill.name))
            ? skillInfoSets.find(skillInfoSet => skillInfoSet.key === this.state.activeSkillSet)
                .value.map(skillInfo => this.renderSkill(characterId, skillInfo, skills.find(skill => skill.name === skillInfo.name), stats, onUpdateTriggerDescription, onDeleteTrigger, onUpdateCharacterSkillRank))
            : <Row className={"skill pl-3"}>No Skills in this Skill Category</Row>
        }
        {this.renderSkillViewFooter(skillInfoSets, characterId, skills)}
      </Col>
    </Row>
  );

  renderSkillGroupByCategory = (characterId, skillInfoSet, skills, stats, onUpdateTriggerDescription, onDeleteTrigger, onUpdateCharacterSkillRank) => (
    skills.length > 0
      ? <Row key={skillInfoSet.key}>
          <Col className={"skillGroupWrapCol"}>
            <Row className={"skillsHeader"} onClick={() => this.toggleCollapse(skillInfoSet.key)}>
              <Col className={"skillsHeaderValue name"}>
                {skillInfoSet.key}<FontAwesomeIcon icon={this.state.collapse[skillInfoSet.key] ? skillGroupOpenIcon : skillGroupCloseIcon} className={`skillsGroupToggleIcon ${this.state.collapse[skillInfoSet.key] ? 'up' : 'down'}`} />
              </Col>
            </Row>
            <Collapse isOpen={this.state.collapse[skillInfoSet.key]}>
              {this.renderSkillsHeader()}
              {
                skills.length > 0
                ? skills.map(skill => this.renderSkill(characterId, skillInfoSet.value.find(skillInfo => skillInfo.name === skill.name), skill, stats, onUpdateTriggerDescription, onDeleteTrigger, onUpdateCharacterSkillRank))
                : <Row className={"skill pl-3"}>No Skills in this Skill Category</Row>
              }
            </Collapse>
          </Col>
        </Row>
      : null
  )

  renderSkillsByCategory = (skillInfoSets, skills, stats, characterId, onUpdateTriggerDescription, onDeleteTrigger, onUpdateCharacterSkillRank) => (
    <Row className={"skillsView"}>
      <Col xs={8} className={"skillsViewHeader"}>
        <Row>
          <Col xs={1} className={"toggleCollapse"}><FontAwesomeIcon icon={skillGroupCloseAllIcon} onClick={() => this.toggleCollapseAll(true)} /></Col>
          <Col xs={1} className={"toggleCollapse"}><FontAwesomeIcon icon={skillGroupOpenAllIcon} onClick={() => this.toggleCollapseAll(false)} /></Col>
        </Row>
      </Col>
      <Col xs={4} className={"skillsViewHeader"}>
        {this.renderSkillViewToggle()}
      </Col>
      <Col xs={12} className={"skillsViewTable"}>
      {
        skillInfoSets.map(skillInfoSet =>
          this.renderSkillGroupByCategory(characterId, skillInfoSet, skills.filter(skill => skillInfoSet.value.some(skillInfo => skillInfo.name === skill.name)), stats, onUpdateTriggerDescription, onDeleteTrigger, onUpdateCharacterSkillRank)
        )
      }
      {this.renderSkillViewFooter(skillInfoSets, characterId, skills)}
      </Col>
    </Row>
  )

  render() {
    const {character, skillInfoSets, onUpdateTriggerDescription, onDeleteTrigger, onUpdateCharacterSkillRank} = this.props;
    const {skills, stats} = character;
    return (
      <Col className={"characterSkills panel rightPanel"} sm={12} md={6}>
        <BlockHeader header={"Skills"} />
        {
          this.state.showSkillsBySet
            ? this.renderSkillsBySet(skillInfoSets, skills, stats, character.id, onUpdateTriggerDescription, onDeleteTrigger, onUpdateCharacterSkillRank)
            : this.renderSkillsByCategory(skillInfoSets, skills, stats, character.id, onUpdateTriggerDescription, onDeleteTrigger, onUpdateCharacterSkillRank)
        }
      </Col>
    )
  }
}

CharacterSkills.propTypes = {
  character: PropTypes.object.isRequired,
  skillInfoSets: PropTypes.array.isRequired,
  onUpdateTriggerDescription: PropTypes.func.isRequired,
  onUpdateCharacterSkillRank: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  return {
    onDeleteTrigger: (skill, triggerKey) => updateCharacterSkill(props.character.id, deleteTriggerTransform(skill, triggerKey)),
    onUpdateTriggerDescription: (skill, triggerKey, newDescription) => updateCharacterSkill(props.character.id, updateTriggerDescriptionTransform(skill, triggerKey, newDescription)),
    onUpdateCharacterSkillRank: (skill, rank) => updateCharacterSkill(props.character.id, updateSkillRankTransform(skill, rank))
  }
}

export default connect(mapStateToProps)(CharacterSkills)