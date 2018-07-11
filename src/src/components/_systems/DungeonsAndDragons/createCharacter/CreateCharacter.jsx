import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {QueryRenderer} from 'react-relay';
import environment from '../../../../relay';
import createCharacterInfoQuery from '../../../../graphql/queries/characterRuleSetInfoQuery';
import {withRouter} from 'react-router';
import {Button, Col, Container, Form, FormGroup, InputGroup, InputGroupAddon, Label, Row} from 'reactstrap';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import Loader from '../../../loader/Loader';
import {createCharacter} from './createCharacterInvocations';
import './CreateCharacter.css';
import {formatModifier, calculateModifierForStat} from '../statUtils';
import {statNameAbbreviation} from '../statUtils';
import * as keys from '../metaDataKeys';

export class CreateCharacter extends Component {
  buildSelectInputFieldGroup = (title, name, values, sm=6) => (
    <Col sm={sm} className={"createPair"}>
      <InputGroup>
        <InputGroupAddon addonType={"prepend"}>{title}</InputGroupAddon>
        <Field name={name} component={"select"} className={"form-control"}>
          <option />
          {values.map(value => <option key={value} value={value} label={value} />)}
        </Field>
      </InputGroup>
    </Col>
  )

  characterDetailsBlock(alignments, backgrounds, classes, races) {
    return (
      <div>
        <FormGroup row>
          <Col className={"createPair"}>
            <InputGroup>
              <InputGroupAddon addonType={"prepend"}>Character Name</InputGroupAddon>
              <Field name={"characterName"} component={"input"} type={"text"} className={"form-control"} />
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row className={"multiCreateRow"}>
          {this.buildSelectInputFieldGroup("Background", "background", backgrounds, 4)}
          {this.buildSelectInputFieldGroup("Alignment", "alignment", alignments, 4)}
          {this.buildSelectInputFieldGroup("Race", "race", races, 4)}
        </FormGroup>
        <FormGroup row>
          <Col className={"createPair"}>
            <InputGroup>
              <InputGroupAddon addonType={"prepend"}>Base Speed</InputGroupAddon>
              <Field name={"baseSpeed"} component={"input"} type={"number"} min={0} step={5} className={"form-control"} />
            </InputGroup>
          </Col>
          <Col className={"createPair"}>
            <InputGroup>
              <InputGroupAddon addonType={"prepend"}>Maximum Hit Points</InputGroupAddon>
              <Field name={"maxHP"} component={"input"} type={"number"} min={0} className={"form-control"} />
            </InputGroup>
          </Col>
          <Col className={"createPair"}>
            <InputGroup>
              <InputGroupAddon addonType={"prepend"}>Hit Dice Value</InputGroupAddon>
              <Field name={"hitDiceValue"} component={"input"} type={"number"} min={0} className={"form-control"} />
            </InputGroup>
          </Col>
        </FormGroup>
      </div>
   );
  }

  buildStatInput = (name, value) => (
    <Col key={name} className={"createPair statPair"} xs={6} sm={4}>
      <Row className={"name input-group-text"}>{name.toUpperCase()}</Row>
      <Row className={"value"}>
        <Col col={6}><Field name={`stats[${name}]`} component={"input"} type={"number"} min={0} step={1} className={"form-control"} /></Col>
        <Col col={6} className={"modifier input-group-text"}>{formatModifier(calculateModifierForStat(value || 10))}</Col>
      </Row>
    </Col>
  )

  statBlock = (statSets, formStats)  => (
    <FormGroup row>
      {statSets.map(set => set.value.map(stat => this.buildStatInput(stat, formStats[stat])))}
    </FormGroup>
  )

  skillsBlock = (skillInfoSet) => ( // Move Set selection above and use static keys
    <Col className={"px-0"}>
      <Row>
        <Col xs={12} sm={8} className={"input-group-text"}>Skill Proficiencies</Col>
        <Col xs={12} sm={4} className={"px-0"}>
          <InputGroup>
            <InputGroupAddon addonType={"prepend"}>Proficiency Bonus</InputGroupAddon>
            <Field component={"input"} type={"number"} name={"proficiencyBonus"} className={"form-control"}/>
          </InputGroup>
        </Col>
      </Row>
      <FormGroup row className={"skillProficiencies"}>
        {
          skillInfoSet
            ? skillInfoSet.value.map(skillInfo =>
              <Col xs={6} sm={2} key={skillInfo.name} className={"skillProficienyCol"}>
                <Label className={"skillProficiencyLabel"}>
                  <InputGroup>
                    <Field component={"input"} type={"checkbox"} name={`skills[${skillInfo.name}].proficiency`} className={"form-control value"} />
                    <InputGroupAddon addonType={"append"} className={"name"}>
                      {`${skillInfo.name} (${statNameAbbreviation(skillInfo.statKeys[0] || ' - ')})`}
                    </InputGroupAddon>
                  </InputGroup>
                </Label>
              </Col>
              )
            : null
        }
      </FormGroup>
    </Col>
  )

  savingThrowsBlock = (savingThrowSet) => (
    <Col className={"px-0"}>
      <Row>
        <Col xs={12} className={"input-group-text"}>Saving Throw Proficiencies</Col>
      </Row>
      <FormGroup row className={"skillProficiencies"}>
        {
          savingThrowSet
            ? savingThrowSet.value.map(savingThrowInfo =>
              <Col xs={6} sm={2} key={savingThrowInfo.name} className={"skillProficienyCol"}>
                <Label className={"skillProficiencyLabel"}>
                  <InputGroup>
                    <Field component={"input"} type={"checkbox"} name={`skills[${savingThrowInfo.name}].proficiency`} className={"form-control value"} />
                    <InputGroupAddon addonType={"append"} className={"name"}>
                      {savingThrowInfo.name}
                    </InputGroupAddon>
                  </InputGroup>
                </Label>
              </Col>
              )
            : null
        }
      </FormGroup>
    </Col>
  )

  render() {
    const {handleSubmit, onSubmit, pristine, submitting, formStats} = this.props;
    return (
      <QueryRenderer
        environment={environment}
        query={createCharacterInfoQuery}
        variables={{ruleSet: 'DUNGEONSAND_DRAGONS'}}
        render={({error, props}) => {
          if (error) {
            console.log(error)
            return <Loader isFetching={false} errorMessage={`${error}`} />
          }
          if (!props) {
            return <Loader isFetching={true} />
          }
          const {statSets, dataLists, skillInfoSets} = props.characterRuleSetInfo;
          const alignments = dataLists.find(list => list.key === 'Alignments').value;
          const backgrounds = dataLists.find(list => list.key === 'Backgrounds').value;
          const classes = dataLists.find(list => list.key === 'Classes').value;
          const races = dataLists.find(list => list.key === 'Races').value;
          const skillInfoSet = skillInfoSets.find(skillInfoSet => skillInfoSet.key === keys.skillSets.DEFAULT)
          const savingThrowInfos = skillInfoSets.find(skillInfoSet => skillInfoSet.key === keys.skillSets.SAVINGTHROWS)
          return (
            <Container className={"createCharacter DnD"}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {this.characterDetailsBlock(alignments, backgrounds, classes, races)}
                {this.statBlock(statSets, formStats)}
                {this.skillsBlock(skillInfoSet)}
                {this.savingThrowsBlock(savingThrowInfos)}
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
  formStats: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  const selector = formValueSelector('createCharacterDnD')
  return {
    formStats: selector(state, 'stats') || {}
  }
}

const mapDispatchToProps = (dispatch, props) => {
  const {history} = props
  return {
    onSubmit: createCharacter(history)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'createCharacterDnD'})(CreateCharacter)))