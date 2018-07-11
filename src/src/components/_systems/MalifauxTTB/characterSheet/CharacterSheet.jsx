import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CharacterSummary from './characterSummary/CharacterSummary';
import CharacterStats from './characterStats/CharacterStats';
import CharacterSkills from './characterSkills/CharacterSkills';
import {Col, Container, Row} from 'reactstrap'
import './CharacterSheet.css';
import CharacterActionsHeader from '../../../characterSheet/CharacterActionsHeader';
import CharacterDerivedStats from './characterDerivedStats/CharacterDerivedStats';

export class CharacterSheet extends Component {
  render() {
    const {character, characterRuleSetInfo} = this.props
    return (
        <div>
          <CharacterActionsHeader character={character}/>
          <Container className={"characterSheet Malifaux"}>
            <Row><CharacterSummary character={character} /></Row>
            <Row>
              <Col sm={6}>
                <CharacterStats character={character} statSets={characterRuleSetInfo.statSets}/>
                <CharacterDerivedStats character={character} />
              </Col>
              <Col sm={6}>
                <CharacterSkills character={character} skillInfoSets={characterRuleSetInfo.skillInfoSets}/>
              </Col>
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