import React, {Component} from 'react'
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../../relay';
import Loader from '../loader/Loader';
import RuleSets, {displayValue, ruleSetNotSupported} from '../_systems/ruleSets';
import MalifauxCharacterSheet from '../_systems/MalifauxTTB/CharacterSheet';
import DungonesAndDragonsCharacterSheet from '../_systems/DungeonsAndDragons/CharacterSheet';

const getCharacterQuery = graphql`query CharacterSheetDispatcherQuery($id: ID!) { character(id: $id) {id, characterName, ruleSet, experience, stats {key, value}, metaData {key, value}} }`

export class CharacterSheetDispatcher extends Component {
  render() {
    const characterId = this.props.match.params.id;
    return (
      <QueryRenderer          
        environment={environment}
        query={getCharacterQuery}
        variables={{id: characterId}}
        render={({error, props}) => {
          if (error) {
            //Raise Failure here
            return <Loader isFetching={false} errorMessage={`${error}`} />
          }
          if (!props) {
            return <Loader isFetching={true} />
          }
          const {character} = props;
          const {ruleSet} = character;
          document.title=`${character.characterName} - ${displayValue(character.ruleSet)}`
          switch(ruleSet) {
            // TODO Can we extract these enum types from the schema?
            case RuleSets.malifaux.key:
              return <MalifauxCharacterSheet character={character} />
            case RuleSets.dnd.key:
              return <DungonesAndDragonsCharacterSheet character={character} />
            default:
              return <Loader isFetching={false} errorMessage={ruleSetNotSupported(ruleSet)} />
          }
        }}
      />
    )
  }
}

export default CharacterSheetDispatcher