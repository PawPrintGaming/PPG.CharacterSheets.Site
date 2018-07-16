import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {QueryRenderer} from 'react-relay';
import environment from '../../../../relay';
import createCharacterInfoQuery from '../../../../graphql/queries/characterRuleSetInfoQuery';
import {withRouter} from 'react-router';
import './CreateCharacter.css';
import {Button, Col, Container, Form, FormGroup, InputGroup, InputGroupAddon, Row, Tooltip} from 'reactstrap';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {createCharacter} from './createCharacterInvocations';
import Loader from '../../../loader/Loader';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import AddNewSkillIcon from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import SquareBackIcon from '@fortawesome/fontawesome-free-solid/faSquare';
import RemoveNewSkillIcon from '@fortawesome/fontawesome-free-solid/faTimes';
import AddNewTriggerIcon from '@fortawesome/fontawesome-free-solid/faLevelDownAlt';
import SuitNames, {iconForSuit} from '../_suits/suits';
import * as keys from '../metaDataKeys';
import ExpandingTextAreaField from '../../../inlineEditors/expandingTextAreaField/ExpandingTextAreaField';

class CreateCharacter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addSkillId: 0,
      addSkills: [],
      addPursuitId: 1,
      addPursuits: [{id: 0, talents: [], talentId: 0}],
      tooltips: {}
    };
  }

  toggleTooltip = (key) => {
    this.setState({
      tooltips: {
        ...this.state.tooltips,
        [key]: !this.state.tooltips[key] || false
      }
    })
  }

  characterDetailsBlock = (stations) => {
    return (
      <Row>
        <Col>
          <FormGroup row>
            <Col className={"createPair"}>
              <InputGroup>
                <InputGroupAddon addonType={"prepend"}>Character Name</InputGroupAddon>
                <Field name={"characterName"} component={"input"} type={"text"} className={"form-control"} />
              </InputGroup>
            </Col>
          </FormGroup>
          <FormGroup row className={"multiCreateRow"}>
            <Col sm={6} className={"createPair"}>
              <InputGroup>
                <InputGroupAddon addonType={"prepend"}>Station</InputGroupAddon>
                <Field name={"station"} component={"select"} className={"form-control"}>
                  <option />
                  {stations.map(station => <option key={station} value={station} label={station}/>)}
                </Field>
              </InputGroup>
            </Col>
            <Col sm={3} className={"createPair"}>
              <InputGroup>
                <InputGroupAddon addonType={"prepend"}>Height</InputGroupAddon>
                <Field name={"height"} component={"input"} type={"number"} className={"form-control"} />
              </InputGroup>
            </Col>
            <Col sm={3} className={"createPair"}>
              <InputGroup>
                <InputGroupAddon addonType={"prepend"}>Guild Scrip</InputGroupAddon>
                <Field name={`wallets[${keys.wallets.GUILDSCRIP}]`} component={"input"} type={"number"} className={"form-control"} />
              </InputGroup>
            </Col>
          </FormGroup>
        </Col>
      </Row>
   );
  }

  buildStatInput = (name) => {
    return (
      <Col key={name} xs={6} sm={3} className={"createPair statPair"}>
        <InputGroup>
          <InputGroupAddon addonType={"prepend"} className={"statPrepend"}>{name}</InputGroupAddon>
          <Field name={`stats[${name}]`} component={"input"} type={"number"} placeholder={0} step={1} className={"form-control"} />
        </InputGroup>
      </Col>
    );
  }

  statBlock = (statSets) => {
    return (
        <FormGroup row>
          {statSets.map(set => set.value.map(stat => this.buildStatInput(stat)))}
        </FormGroup>
    );
  }

  onAddNewSkill = () => {
    let updatedAddSkills = this.state.addSkills.slice();
    updatedAddSkills.push({id: this.state.addSkillId, skillCategory: null, triggers: [], triggersId : 0});
    this.setState({
      addSkills: updatedAddSkills,
      addSkillId: this.state.addSkillId + 1
    });
  }

  onRemoveSkill = (id) => {
    let updatedAddSkills = this.state.addSkills.slice();
    let indexToRemove = updatedAddSkills.findIndex(skill => skill.id === id);
    updatedAddSkills.splice(indexToRemove, 1);
    this.setState({
      addSkills: updatedAddSkills
    });
  }

  onAddNewTrigger = (skillId) => {
    let updatedAddSkills = this.state.addSkills.slice();
    let indexToUpdate = updatedAddSkills.findIndex(skill => skill.id === skillId);
    let skillToUpdate = updatedAddSkills[indexToUpdate];
    skillToUpdate.triggers.push({id: skillToUpdate.triggersId});
    skillToUpdate.triggersId = skillToUpdate.triggersId + 1;
    updatedAddSkills = [...updatedAddSkills.slice(0, indexToUpdate), skillToUpdate, ...updatedAddSkills.slice(indexToUpdate+1)]
    this.setState({
      addSkills: updatedAddSkills
    });
  }

  onRemoveTrigger = (skillId, triggerId) => {
    let updatedAddSkills = this.state.addSkills.slice();
    let indexToUpdate = updatedAddSkills.findIndex(skill => skill.id === skillId);
    let skillToUpdate = updatedAddSkills[indexToUpdate];
    let triggerToRemoveIndex = skillToUpdate.triggers.findIndex(trigger => trigger.id === triggerId);
    skillToUpdate.triggers.splice(triggerToRemoveIndex, 1);
    updatedAddSkills = [...updatedAddSkills.slice(0, indexToUpdate), skillToUpdate, ...updatedAddSkills.slice(indexToUpdate+1)]
    this.setState({
      addSkills: updatedAddSkills
    });
  }

  onSkillCategorySelect = (id, selected) => {
    let updatedAddSkills = this.state.addSkills.slice();
    let skillToUpdateIndex = updatedAddSkills.findIndex(skill => skill.id === id);
    let skillToUpdate = updatedAddSkills[skillToUpdateIndex]
    skillToUpdate = {...skillToUpdate, skillCategory: selected === '' ? null : selected};
    updatedAddSkills[skillToUpdateIndex] = skillToUpdate;
    this.setState({
      addSkills: updatedAddSkills
    });
  }

  renderSkillNameOptions = (skillInfoSets, skill) => {
    console.log(skill.skillCategory, skillInfoSets)
    const skillsToDisplay = skill.skillCategory !== null
      ? skillInfoSets.find(skillInfoSet => skillInfoSet.key === skill.skillCategory).value
      : [].concat.apply([], skillInfoSets.map(skillInfoSet => skillInfoSet.value));
    return skillsToDisplay.map(skillInfo =>
      <option key={skillInfo.name} label={skillInfo.name} value = {skillInfo.name} />
    );
  }

  renderAddTriggers = (skill) => {
    return (
      skill.triggers.map(trigger => 
        <Row key={trigger.id} className={"addTriggerSet"}>
          <Col>
            <Row>
              <Col sm={6} className={"name"}>
                <InputGroup>
                  <InputGroupAddon addonType={"prepend"}>Name</InputGroupAddon>
                  <Field name={`skills[${skill.id}].triggers[${trigger.id}].name`} component={"input"} className={"form-control"} type={"text"} />
                </InputGroup>
              </Col>
              <Col sm={5} className={"suit"}>
                <InputGroup>
                  <InputGroupAddon addonType={"prepend"}>Suit </InputGroupAddon>
                    <Row className={"suitSelection form-control"}>
                      <Col xs={2} className={"suitPair"}><label><Field name={`skills[${skill.id}].triggers[${trigger.id}].suit`} component={"input"} type={"radio"} value={SuitNames.crows}/>{iconForSuit(SuitNames.crows)}</label></Col>
                      <Col xs={2} className={"suitPair"}><label><Field name={`skills[${skill.id}].triggers[${trigger.id}].suit`} component={"input"} type={"radio"} value={SuitNames.masks}/>{iconForSuit(SuitNames.masks)}</label></Col>
                      <Col xs={2} className={"suitPair"}><label><Field name={`skills[${skill.id}].triggers[${trigger.id}].suit`} component={"input"} type={"radio"} value={SuitNames.rams}/>{iconForSuit(SuitNames.rams)}</label></Col>
                      <Col xs={2} className={"suitPair"}><label><Field name={`skills[${skill.id}].triggers[${trigger.id}].suit`} component={"input"} type={"radio"} value={SuitNames.tomes}/>{iconForSuit(SuitNames.tomes)}</label></Col>
                    </Row>
                </InputGroup>
              </Col>
              <Col sm={1} className={"addSkillActionsCol addSkillCol"}>
                <Row className={"addSkillActions input-group-text"}>
                  <Col className={"fa-layers fa-fw"}>
                    <FontAwesomeIcon icon={SquareBackIcon} className={"skillActionIcon"} />
                    <FontAwesomeIcon icon={RemoveNewSkillIcon} className={"skillActionIcon internal"} onClick={() => this.onRemoveTrigger(skill.id, trigger.id)} />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col className={"description"}>
                <InputGroup>
                  <InputGroupAddon addonType={"prepend"}>Description</InputGroupAddon>
                  <Field name={`skills[${skill.id}].triggers[${trigger.id}].description`} component={"textarea"} type={"textarea"} className={"form-control"}/>
                </InputGroup>
              </Col>
            </Row>
          </Col>
        </Row>
      )
    )
  }

  renderAddSkills = (skillInfoSets) => {
    return (
      this.state.addSkills.map(skill => (
        <Row key={skill.id} id={skill.id} className={"addSkillSet"}>
          <Col>
            <Row>
              <Col sm={5} className={"addSkillCategoryCol addSkillCol"}>
                <InputGroup>
                  <InputGroupAddon addonType={"prepend"}>Category</InputGroupAddon>
                  <Field name={`skills[${skill.id}].category`} component={"select"} className={"form-control"} onChange={event => this.onSkillCategorySelect(skill.id, event.target.value)}>
                    <option value={null}/>
                    {skillInfoSets.map(info => <option key={info.key} value={info.key} label={info.key}/>)}
                  </Field>
                </InputGroup>
              </Col>
              <Col sm={4} className={"addSkillNameCol addSkillCol"}>
                <InputGroup>
                  <InputGroupAddon addonType={"prepend"}>Skill Name</InputGroupAddon>
                  <Field name={`skills[${skill.id}].name`} component={"select"} className={"form-control"}>
                    <option />
                    {this.renderSkillNameOptions(skillInfoSets, skill, skill)}
                  </Field>
                </InputGroup>
              </Col>
              <Col xs={6} sm={2} className={"addSkillRankCol addSkillCol"}>
                <InputGroup>
                  <InputGroupAddon addonType={"prepend"}>Rating</InputGroupAddon>
                  <Field name={`skills[${skill.id}].rank`} component={"input"} type={"number"} className={"form-control"}/>
                </InputGroup>
              </Col>
              <Col xs={6} sm={1} className={"addSkillActionsCol addSkillCol"}>
                <Row className={"addSkillActions input-group-text"}>
                  <Col className={"fa-layers fa-fw"}>
                    <FontAwesomeIcon icon={SquareBackIcon} className={"skillActionIcon"} />
                    <FontAwesomeIcon icon={AddNewTriggerIcon} className={"skillActionIcon internal"} onClick={() => this.onAddNewTrigger(skill.id)} />
                  </Col>
                  <Col className={"fa-layers fa-fw"}>
                    <FontAwesomeIcon icon={SquareBackIcon} className={"skillActionIcon"} />
                    <FontAwesomeIcon icon={RemoveNewSkillIcon} className={"skillActionIcon internal"} onClick={() => this.onRemoveSkill(skill.id)} />
                  </Col>
                </Row>
              </Col>
            </Row>
            {this.renderAddTriggers(skill)}
          </Col>
        </Row>
      ))
    )
  }

  renderSkillsBlock = (skillInfoSets) => {
    return (
      <Row className={"skillsBlock form-group"}>
        <Col>
          <Row className={"addSkillBar input-group-text"}>
            Skills<FontAwesomeIcon icon={AddNewSkillIcon} className={"addNewSkillIcon"} onClick={() => this.onAddNewSkill()}/>
          </Row>
          <Row className={"addSkillBlock"}>
            <Col>
              {this.renderAddSkills(skillInfoSets)}
            </Col>
          </Row>
          {
            this.state.addSkills.length === 0
              ? null
              : <Row className={"addSkillBar noText input-group-text"}>
                  <FontAwesomeIcon icon={AddNewSkillIcon} className={"addNewSkillIcon"} onClick={() => this.onAddNewSkill()}/>
                </Row>
          }
        </Col>
      </Row>
    )
  }
  
  onAddNewPursuit = () => {
    let updatedAddPursuits = this.state.addPursuits.slice();
    updatedAddPursuits.push({id: this.state.addPursuitId, talents: [], talentId: 0});
    this.setState({
      addPursuits: updatedAddPursuits,
      addPursuitId: this.state.addPursuitId + 1
    });
  }

  onRemovePursuit = (id) => {
    let updatedAddPursuits = this.state.addPursuits.slice();
    let indexToRemove = updatedAddPursuits.findIndex(pursuit => pursuit.id === id);
    updatedAddPursuits.splice(indexToRemove, 1);
    this.setState({
      addPursuits: updatedAddPursuits
    });
  }

  onAddNewPursuitTalent = (pursuitId) => {
    let updatedAddPursuits = this.state.addPursuits.slice();
    let indexToUpdate = updatedAddPursuits.findIndex(pursuit => pursuit.id === pursuitId);
    let pursuitToUpdate = updatedAddPursuits[indexToUpdate];
    pursuitToUpdate.talents.push({id: pursuitToUpdate.talentId});
    pursuitToUpdate.talentId = pursuitToUpdate.talentId + 1;
    updatedAddPursuits = [...updatedAddPursuits.slice(0, indexToUpdate), pursuitToUpdate, ...updatedAddPursuits.slice(indexToUpdate+1)]
    this.setState({
      addPursuits: updatedAddPursuits
    });
  }

  onRemovePursuitTalent = (pursuitId, talentId) => {
    let updatedAddPursuits = this.state.addPursuits.slice();
    let indexToUpdate = updatedAddPursuits.findIndex(pursuit => pursuit.id === pursuitId);
    let pursuitToUpdate = updatedAddPursuits[indexToUpdate];
    let pursuitToRemoveIndex = pursuitToUpdate.talents.findIndex(talent => talent.id === talentId);
    pursuitToUpdate.talents.splice(pursuitToRemoveIndex, 1);
    updatedAddPursuits = [...updatedAddPursuits.slice(0, indexToUpdate), pursuitToUpdate, ...updatedAddPursuits.slice(indexToUpdate+1)]
    this.setState({
      addPursuits: updatedAddPursuits
    });
  }

  renderPursuitTalents = (pursuitId, talents) => {
    return (
      talents.map(talent =>
        <Row key={talent.id}>
          <Col>
            <Row className={"addTriggerSet"}>
              <Col>
                <Row>
                  <Col sm={6} className={"name"}>
                    <InputGroup>
                      <InputGroupAddon addonType={"prepend"}>Name</InputGroupAddon>
                      <Field name={`pursuits[${pursuitId}].talents[${talent.id}].name`} component={"input"} type={"text"} className={"form-control"} />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className={"description"}>
                    <InputGroup>
                      <InputGroupAddon addonType={"prepend"}>Description</InputGroupAddon>
                      <ExpandingTextAreaField name={`pursuits[${pursuitId}].talents[${talent.id}].description`} component={"textarea"} className={"form-control"} cols={80} />
                    </InputGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      )
    )
  }

  renderAddPursuits = (pursuits, selectedPursuitId) => {
    return (
      this.state.addPursuits.map(pursuit => (
        <Row key={pursuit.id} id={pursuit.id} className={"addSkillSet"}>
          <Col>
            <Row>
              <Col sm={5} className={"addSkillCol"}>
                <InputGroup>
                  <InputGroupAddon addonType={"prepend"}>Pursuit</InputGroupAddon>
                  <Field name={`pursuits[${pursuit.id}].name`} component={"select"} className={"form-control"}>
                    <option />
                    {pursuits.map(pursuit => <option key={pursuit} value={pursuit} label={pursuit} />)}
                  </Field>
                </InputGroup>
              </Col>
              <Col sm={3} className={"addSkillCol"}>
                <InputGroup>
                  <InputGroupAddon addonType={"prepend"}>Steps</InputGroupAddon>
                  <Field name={`pursuits[${pursuit.id}].rank`} component={"input"} type={"number"} className={"form-control"} />
                </InputGroup>
              </Col>
              <Col sm={3} className={"addSkillCol"}>
                <InputGroup>
                  <InputGroupAddon addonType={"prepend"}>Starting Pursuit</InputGroupAddon>
                  <Row className={"form-control mx-0"}>
                    <Field name={"startingPursuitId"} component={"input"} type={"radio"} value={pursuit.id} checked={selectedPursuitId === pursuit.id} /> {/* Not selecting, form value disonese? */}
                  </Row>
                </InputGroup>
              </Col>
              <Col xs={6} sm={1} className={"addSkillActionsCol addSkillCol"}>
                <Row className={"addSkillActions input-group-text"}>
                  <Col className={"fa-layers fa-fw"}>
                    <FontAwesomeIcon icon={SquareBackIcon} className={"skillActionIcon"} />
                    <FontAwesomeIcon icon={AddNewTriggerIcon} className={"skillActionIcon internal"} onClick={() => this.onAddNewPursuitTalent(pursuit.id)} />
                  </Col>
                  <Col className={"fa-layers fa-fw"}>
                    <FontAwesomeIcon icon={SquareBackIcon} className={"skillActionIcon"} />
                    <FontAwesomeIcon icon={RemoveNewSkillIcon} className={"skillActionIcon internal"} onClick={() => this.onRemovePursuit(pursuit.id)} />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className={"addTriggerSet"}>
              <Col>
                <Row>
                  <Col>
                    <Row className={"input-group-text"}>
                      Venture Talent
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6} className={"name"}>
                    <InputGroup>
                      <InputGroupAddon addonType={"prepend"}>Name</InputGroupAddon>
                      <Field name={`pursuits[${pursuit.id}].ventureName`} component={"input"} type={"text"} className={"form-control"} />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className={"description"}>
                    <InputGroup>
                      <InputGroupAddon addonType={"prepend"}>Description</InputGroupAddon>
                      <ExpandingTextAreaField name={`pursuits[${pursuit.id}].ventureDescription`} component={"textarea"} className={"form-control"} cols={80} />
                    </InputGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className={"addTriggerSet"}>
              <Col>
                {
                  pursuit.talents.length > 0
                    ? <Row>
                        <Col>
                          <Row className={"input-group-text"}>
                            Pursuit Talents
                          </Row>
                        </Col>
                      </Row>
                    : null
                }
                {this.renderPursuitTalents(pursuit.id, pursuit.talents)}
              </Col>
            </Row>
          </Col>
        </Row>
      ))
    )
  }

  renderPursuitsBlock = (pursuits, selectedPursuitId) => {
    return (
      <Row className={"skillsBlock form-group"}>
        <Col>
          <Row className={"addSkillBar input-group-text"}>
            Pursuits<FontAwesomeIcon id={"AddNewPursuitTop"} icon={AddNewSkillIcon} className={"addNewSkillIcon"} onClick={() => this.onAddNewPursuit()}/>
            <Tooltip placement={"bottom"} target={"AddNewPursuitTop"} delay={0} isOpen={this.state.tooltips['addNewPursuitTop'] || false} toggle={() => this.toggleTooltip('addNewPursuitTop')}>
              Add another Pursuit
            </Tooltip>
          </Row>
          <Row className={"addSkillBlock"}>
            <Col>
              {this.renderAddPursuits(pursuits, selectedPursuitId)}
            </Col>
          </Row>
          {
            this.state.addPursuits.length === 0
              ? null
              : <Row className={"addSkillBar noText input-group-text"}>
                  <FontAwesomeIcon id={"AddNewPursuitBottom"} icon={AddNewSkillIcon} className={"addNewSkillIcon"} onClick={() => this.onAddNewPursuit()}/>
                  <Tooltip placement={"top"} target={"AddNewPursuitBottom"} delay={0} isOpen={this.state.tooltips['addNewPursuitBottom'] || false} toggle={() => this.toggleTooltip('addNewPursuitBottom')}>
                    Add another Pursuit
                  </Tooltip>
                </Row>
          }
        </Col>
      </Row>
    )
  }

  render() {
    const {handleSubmit, onSubmit, pristine, submitting, selectedPursuitId} = this.props;
    return (
      <QueryRenderer
        environment={environment}
        query={createCharacterInfoQuery}
        variables={{ruleSet: 'MALIFAUX_TTB'}}
        render ={({error, props}) => {
          if (error) {
            return <Loader isFetching={false} errorMessage={`${error}`} />
          }
          if (!props) {
            return <Loader isFetching={true} />
          }
          const {statSets, dataLists, skillInfoSets} = props.characterRuleSetInfo;
          const stations = dataLists.find(list => list.key === 'Stations').value;
          const pursuits = dataLists.find(list => list.key === 'Pursuits').value; // Remove selected items
          return (
            <Container className={"createCharacter Malifaux"}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {this.characterDetailsBlock(stations)}
                {this.statBlock(statSets)}
                {this.renderPursuitsBlock(pursuits, selectedPursuitId)}
                {this.renderSkillsBlock(skillInfoSets)}
                <FormGroup row className={"submit"}>
                    <Button type={"submit"} disabled={pristine || submitting} onSubmit={() => { return false }}>
                      Create
                    </Button>
                </FormGroup>
              </Form>
            </Container>
          )
        }}
      />
    )
  }
}

CreateCharacter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  selectedPursuitId: PropTypes.number.isRequired
}

const mapStateToProps = (state, props) => {
  const {history} = props;
  const selector = formValueSelector('createCharacterMalifaux');
  return {
    onSubmit: createCharacter(history),
    selectedPursuitId: parseInt((selector(state, 'startingPursuitId') || 0), 10)
  }
}

export default withRouter(connect(mapStateToProps)(reduxForm({form: 'createCharacterMalifaux'})(CreateCharacter)))