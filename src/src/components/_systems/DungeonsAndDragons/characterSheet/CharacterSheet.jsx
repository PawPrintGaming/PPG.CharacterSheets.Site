import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CharacterSummary from './characterSummary/CharacterSummary';
import CharacterStats from './characterStats/CharacterStats';
import {Container, Row} from 'reactstrap'
import './CharacterSheet.css';
import CharacterActionsHeader from '../../../characterSheet/CharacterActionsHeader';
import CharacterSkills from './characterSkills/CharacterSkills';

export class CharacterSheet extends Component {
  render() {
    const {character, characterRuleSetInfo} = this.props
    return (
      <div>
        <CharacterActionsHeader character={character} />
        <Container className={"characterSheet DnD"}>
          <CharacterSummary character={character} />
          <Row>
            <CharacterStats character={character} />
            <CharacterSkills character={character} skillInfoSets={characterRuleSetInfo.skillInfoSets}/>
          </Row>
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