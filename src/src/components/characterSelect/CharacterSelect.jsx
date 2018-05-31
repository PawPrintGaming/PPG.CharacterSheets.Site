import React, {Component} from 'react';
import Loader from '../loader/Loader';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import './CharacterSelect.css';
import environment from '../../relay';
import {graphql, QueryRenderer} from 'react-relay';
import Select from 'react-select';
import {withRouter} from 'react-router';
import {displayValue} from '../_systems/ruleSets';

const characterSelectQuery = graphql`query CharacterSelectQuery { characters { id, characterName, ruleSet } }`

export class CharacterSelect extends Component {
  buildOptions (characterSummaries) {
    return characterSummaries.map(summary => {
      return { value: summary.id, label: `${summary.characterName} - ${displayValue(summary.ruleSet)}`}
    })
  }

  render () {
    const {history, onCharacterSelect} = this.props;
    document.title='Character Select'
    return (
      <div className={"characterSelect"}>
        <Row className={"mx-0"}>
          <QueryRenderer
            environment={environment}
            query={characterSelectQuery}
            variables={{}}
            render={({error, props}) => {
              if (error) {
                //Raise Failure here
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
                  options={this.buildOptions(props.characters)}
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

const mapStateToProps = (state) => {
  return {
    onCharacterSelect: (history, summary) => {
      history.push(`/character/${summary.value}`)
    }
  }
}

export default withRouter(connect(mapStateToProps)(CharacterSelect));