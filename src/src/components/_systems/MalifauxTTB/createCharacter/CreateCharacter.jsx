import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {QueryRenderer} from 'react-relay';
import environment from '../../../../relay';
import createCharacterInfoQuery from '../../../../graphql/queries/characterRuleSetInfoQuery';
import {withRouter} from 'react-router';
import './CreateCharacter.css';
import {Button, Col, Container, Form, FormGroup, InputGroup, InputGroupAddon} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import {createCharacter} from './createCharacterInvocations';
import Loader from '../../../loader/Loader';

class CreateCharacter extends Component {
  characterDetailsBlock(stations, pursuits) {
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
      </div>
   );
  }

  buildStatInput(name) {
    return (
      <Col key={name} xs={6} sm={3} className={"createPair statPair"}>
        <InputGroup>
          <InputGroupAddon addonType={"prepend"} className={"statPrepend"}>{name}</InputGroupAddon>
          <Field name={`stats[${name}]`} component={"input"} type={"number"} placeholder={0} step={1} className={"form-control"} />
        </InputGroup>
      </Col>
    );
  }

  statBlock(statSets) {
    return (
        <FormGroup row>
          {statSets.map(set => set.value.map(stat => this.buildStatInput(stat)))}
        </FormGroup>
    );
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
          const {statSets, dataLists} = props.characterRuleSetInfo;
          const stations = dataLists.find(list => list.key === 'Stations').value;
          const pursuits = dataLists.find(list => list.key === 'Pursuits').value;
          return (
            <Container className={"createCharacter Malifaux"}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {this.characterDetailsBlock(stations, pursuits)}
                {this.statBlock(statSets)}
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
  onSubmit: PropTypes.func.isRequired
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