import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loader from '../loader/Loader';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import './CharacterSelect.css';
import environment from '../../relay';
import {QueryRenderer} from 'react-relay';
import Select from 'react-select';
import {withRouter} from 'react-router';
import {displayValue} from '../_systems/ruleSets';
import charactersQuery from '../../graphql/queries/charactersQuery';

export class CharacterSelect extends Component {
  buildOptions (characterSummaries, ruleSetInfos) {
    return characterSummaries.map(summary => {
      return { value: summary.id, label: `${summary.characterName} - ${displayValue(ruleSetInfos, summary.ruleSet)}`}
    })
  }

  render () {
    const {history, ruleSetInfos, onCharacterSelect} = this.props;
    document.title='Character Select'
    return (
      <div className={"characterSelect"}>
        <Row className={"mx-0"}>
          <QueryRenderer
            environment={environment}
            query={charactersQuery}
            variables={{}}
            render={({error, props}) => {
              if (error) {
                return <Loader isFetching={false} errorMessage={`${error}`} />
              }
              if (!props) {
                return <Loader isFetching={true} />
              }
              return (
                <Col className={"text-center mt-3"}>
                <Select
                  name="characterSelect"
                  placeholder="Select Character"
                  options={this.buildOptions(props.characters, ruleSetInfos)}
                  onChange={summary => onCharacterSelect(history, summary)}
                />
                </Col>
              )
            }}
          />
        </Row>
      </div>
    )    
  }
};

CharacterSelect.propTypes = {
  ruleSetInfos: PropTypes.array.isRequired,
  onCharacterSelect: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    ruleSetInfos: state.ruleSetsStore.ruleSetInfos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCharacterSelect: (history, summary) => {
      history.push(`/character/${summary.value}`)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CharacterSelect));