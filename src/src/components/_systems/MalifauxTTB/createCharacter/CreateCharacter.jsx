import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {QueryRenderer} from 'react-relay';
import environment from '../../../../relay';
import createCharacterInfoQuery from '../../../../graphql/queries/characterRuleSetInfoQuery';
import {withRouter} from 'react-router';
import './CreateCharacter.css';
import {Button, Col, Container, Form, FormGroup, InputGroup, InputGroupAddon, Row} from 'reactstrap';
import {Field,reduxForm} from 'redux-form';
import {createCharacter} from './createCharacterInvocations';
import Loader from '../../../loader/Loader';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import AddNewSkillIcon from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import SquareBackIcon from '@fortawesome/fontawesome-free-solid/faSquare';
import RemoveNewSkillIcon from '@fortawesome/fontawesome-free-solid/faTimes';
import AddNewTriggerIcon from '@fortawesome/fontawesome-free-solid/faLevelDownAlt';
import SuitNames, {iconForSuit} from '../_suits/suits';

class CreateCharacter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addSkillId: 0,
      addSkills: []
    };
  }

  characterDetailsBlock = (stations, pursuits) => {
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
            <Col sm={6} className={"createPair"}>
              <InputGroup>
                <InputGroupAddon addonType={"prepend"}>Starting Pursuit</InputGroupAddon>
                <Field name={"startingPursuit"} component={"select"} className={"form-control"}>
                  <option />
                  {pursuits.map(pursuit => <option key={pursuit} value={pursuit} label={pursuit}/>)}
                </Field>
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
    const skillsToDisplay = skill.skillCategory !== null
      ? skillInfoSets.find(skillInfoSet => skillInfoSet.key === skill.skillCategory).value
      : [].concat.apply([], skillInfoSets.map(skillInfoSet => skillInfoSet.value));
    return skillsToDisplay.map(skillInfo =>
      <option key={skillInfo.name} label={skillInfo.name} value = {skillInfo.name} />
    );
  }

  renderAddTriggers = (skill) => (
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
                  <Row className={"suitSelection"}>
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

  skillsBlock = (skillInfoSets) => {
    return (
      <Row className={"skillsBlock"}>
        <Col>
          <Row className={"addSkillBar input-group-text"}>
            Skills<FontAwesomeIcon icon={AddNewSkillIcon} className={"addNewSkillIcon"} onClick={() => this.onAddNewSkill()}/>
          </Row>
          <Row className={"addSkillBlock"}>
            <Col>
              {this.renderAddSkills(skillInfoSets)}
            </Col>
          </Row>
          <Row className={"addSkillBar noText input-group-text"}>
            <FontAwesomeIcon icon={AddNewSkillIcon} className={"addNewSkillIcon"} onClick={() => this.onAddNewSkill()}/>
          </Row>
        </Col>
      </Row>
    )
  }

  render() {
    const {handleSubmit, onSubmit, pristine, submitting} = this.props;
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
          const pursuits = dataLists.find(list => list.key === 'Pursuits').value;
          return (
            <Container className={"createCharacter Malifaux"}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {this.characterDetailsBlock(stations, pursuits)}
                {this.statBlock(statSets)}
                {this.skillsBlock(skillInfoSets)}
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
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, props) => {
  const {history} = props;
  return {
    onSubmit: createCharacter(history)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'createCharacterMalifaux'})(CreateCharacter)))