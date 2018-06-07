import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CharacterSummary from './characterSummary/CharacterSummary';
import CharacterStats from './characterStats/CharacterStats';
import {Container} from 'reactstrap'
import './CharacterSheet.css';
import CharacterActionsHeader from '../../../characterSheet/CharacterActionsHeader';

export class CharacterSheet extends Component {
  render() {
    const {character, characterRuleSetInfo} = this.props
    return (
        <div>
          <CharacterActionsHeader character={character}/>
          <Container className={"characterSheet Malifaux"}>
            <CharacterSummary character={character} />
            <CharacterStats stats={character.stats} statSets={characterRuleSetInfo.statSets}/>
          </Container>
        </div>
    )
  }
}

CharacterSheet.propTypes = {
  character: PropTypes.object.isRequired,
  characterRuleSetInfo: PropTypes.object.isRequired
}

export default CharacterSheet