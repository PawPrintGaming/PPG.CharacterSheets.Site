import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './CreateCharacterDispatcher.css';
import Loader from '../loader/Loader';
import {ruleSetNotSupported} from '../_systems/ruleSets';
import CreateCharacterSelect from './CreateCharacterSelect';

export class CreateCharacterDispatcher extends Component {
  render() {
    const {ruleSetInfos} = this.props;
    const ruleSet = this.props.match.params.ruleSet;
    if(ruleSetInfos === undefined || ruleSetInfos.length === 0) {
      return <Loader isFetching={true} />
    }
    switch(ruleSet) {
      case undefined:
        return <CreateCharacterSelect />
      default:
        {
          const ruleSetInfo = ruleSetInfos.find(ruleSetInfo => ruleSetInfo.ruleSet === ruleSet)
          if(ruleSetInfo !== undefined && ruleSetInfo.createCharacterPath !== undefined) {
            try {
              const CreateCharacterComponent = require(`../${ruleSetInfo.createCharacterPath}`);
              document.title = `Create Character - ${ruleSetInfo.name}`;
              return <CreateCharacterComponent.default/>
            }
            catch (err) {
              return <Loader isFetching={false} errorMessage={`Cannot load Create Character for ${ruleSetInfo.name}. Cannot resolve path: ../${ruleSetInfo.createCharacterPath}`} />
            }
          }          
          return <Loader isFetching={false} errorMessage={ruleSetNotSupported(ruleSet, 'creating a Character Sheet')} />
        }
    }
  }
}

CreateCharacterDispatcher.propTypes = {
  ruleSetInfos: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    ruleSetInfos: state.ruleSetsStore.ruleSetInfos
  }
}

export default connect(mapStateToProps)(CreateCharacterDispatcher)