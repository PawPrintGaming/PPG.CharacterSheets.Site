import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CharacterSummary from './characterSummary/CharacterSummary';
import CharacterStats from './characterStats/CharacterStats';
import {Container} from 'reactstrap'
import './CharacterSheet.css';
import {getClass, getLevel, getBackground, getRace, getAligment} from './metaDataUtils';

export class CharacterSheet extends Component {
  render() {
    const {character} = this.props
    return (
      <Container className={"characterSheet DnD"}>
        <CharacterSummary
          characterName={character.characterName}
          characterClass={getClass(character.metaData)}
          characterLevel={getLevel(character.metaData)}
          characterBackground={getBackground(character.metaData)}
          playerName={"-"}
          characterRace={getRace(character.metaData)}
          characterAlignment={getAligment(character.metaData)}
          experience={character.experience}
        />
        <CharacterStats stats={character.stats} />
      </Container>
    )
  }
}

CharacterSheet.propTypes = {
  character: PropTypes.object.isRequired
}

export default CharacterSheet