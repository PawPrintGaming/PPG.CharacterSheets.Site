import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CharacterSummary from './characterSummary/CharacterSummary';
import CharacterStats from './characterStats/CharacterStats';
import {getCurrentPursuit, getStation, getDestinyStepsFulfilled} from './metaDataUtils';
import {Container} from 'reactstrap'
import './CharacterSheet.css';

export class CharacterSheet extends Component {
  render() {
    const {character} = this.props
    return (
      <div className={"characterSheet Malifaux"}>
        <Container>
          <CharacterSummary
            fatedName={character.characterName}
            currentPursuit={getCurrentPursuit(character.metaData)}
            station={getStation(character.metaData)}
            playerName={"-"}
            guildScrip={0}
            destinyStepsFulfilled={getDestinyStepsFulfilled(character.metaData)}
            experience={character.experience}
          />
          <CharacterStats stats={character.stats} />
        </Container>
      </div>
    )
  }
}

CharacterSheet.propTypes = {
  character: PropTypes.object.isRequired
}

export default CharacterSheet