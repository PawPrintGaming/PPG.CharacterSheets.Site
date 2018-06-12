import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {QueryRenderer} from 'react-relay';
import environment from '../../relay';
import Loader from '../loader/Loader';
import {displayValue, ruleSetNotSupported} from '../_systems/ruleSets';
import characterSelectQuery from '../../graphql/queries/characterSelectQuery';
import characterRuleSetInfoQuery from '../../graphql/queries/characterRuleSetInfoQuery';

export class CharacterSheetDispatcher extends Component {
  render() {
    const {ruleSetInfos} = this.props;
    const characterId = this.props.match.params.id;
    return (
      <QueryRenderer          
        environment={environment}
        query={characterSelectQuery}
        variables={{id: characterId}}
        render={({error, props}) => {
          if (error) {
            //Raise Failure here
            return <Loader isFetching={false} errorMessage={`${error}`} />
          }
          if (!props) {
            return <Loader isFetching={true} />
          }
          if (!props.character) {
            return <Loader isFetching={false} errorMessage={"Character not found"} />
          }
          const {character} = props;
          const {ruleSet} = character;
          document.title=`${character.characterName} - ${displayValue(ruleSetInfos, character.ruleSet)}`
          const ruleSetInfo = ruleSetInfos.find(ruleSetInfo => ruleSetInfo.ruleSet === ruleSet)
          if(ruleSetInfo !== undefined && ruleSetInfo.createCharacterPath !== undefined) {
            return (
              <QueryRenderer
                environment={environment}
                query={characterRuleSetInfoQuery}
                variables={{ruleSet: ruleSetInfo.ruleSet}}
                render={({error, props}) => {
                  if (error) {
                    //Raise Failure here
                    return <Loader isFetching={false} errorMessage={`${error}`} />
                  }
                  if (!props) {
                    return <Loader isFetching={true} />
                  }
                  if (!props.characterRuleSetInfo) {
                    return <Loader isFetching={false} errorMessage={`Character Rule Set Info not found for ${ruleSetInfo.ruleSet}`} />
                  }
                  try {
                    const CreateCharacterComponent = require(`../${ruleSetInfo.viewCharacterPath}`);
                    return <CreateCharacterComponent.default character={character} characterRuleSetInfo={props.characterRuleSetInfo} />
                  }
                  catch (err) {
                    return <Loader isFetching={false} erroMessage={`Cannot load Create Character for ${ruleSetInfo.name}. Cannot resolve path: ../${ruleSetInfo.createCharacterPath}`} />
                  }
                }}
              />
            )
          }          
          return <Loader isFetching={false} errorMessage={ruleSetNotSupported(ruleSet, 'creating a Character Sheet')} />
        }}
      />
    )
  }
}

CharacterSheetDispatcher.propTypes = {
  ruleSetInfos: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
  return {
    ruleSetInfos: state.ruleSetsStore.ruleSetInfos
  }
};

export default connect(mapStateToProps)(CharacterSheetDispatcher)