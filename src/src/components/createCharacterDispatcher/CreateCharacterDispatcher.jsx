import React, {Component} from 'react';
import './CreateCharacterDispatcher.css';
import Loader from '../loader/Loader';
import RuleSets, {ruleSetNotSupported} from '../_systems/ruleSets';

export class CreateCharacterDispatcher extends Component {
  render() {
    const ruleSet = this.props.match.params.ruleSet;
    switch(ruleSet) {
      case undefined:
        return <p>Create a new character</p>
      default:
        return <Loader isFetching={false} errorMessage={ruleSetNotSupported(ruleSet)} />
    }
    return <p>CreateCharacterDispatcher</p>
  }
}

export default CreateCharacterDispatcher