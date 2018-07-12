import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CharacterSummary from './characterSummary/CharacterSummary';
import CharacterStats from './characterStats/CharacterStats';
import {Col, Container, Row} from 'reactstrap'
import './CharacterSheet.css';
import CharacterActionsHeader from '../../../characterSheet/CharacterActionsHeader';
import CharacterSkills from './characterSkills/CharacterSkills';
import CharacterDefences from './characterDefences/CharacterDefences';
import CharacterPersonalCharacteristics from './characterPersonalCharacteristics/CharacterPersonalCharacteristics';
import CharacterWallet from './characterWallet/CharacterWallet';

export class CharacterSheet extends Component {
  render() {
    const {character, characterRuleSetInfo} = this.props
    return (
      <div>
        <CharacterActionsHeader character={character} />
        <Container className={"characterSheet DnD"}>
          <CharacterSummary character={character} />
          <Row>
            <Col sm={12} md={4} lg={2} className={"primaryColumn"}>
              <CharacterStats character={character} />
            </Col>
            <Col sm={12} md={3} className={"characterBonusesAndSkills primaryColumn"}>
              <CharacterSkills character={character} skillInfoSets={characterRuleSetInfo.skillInfoSets}/>
            </Col>
            <Col sm={3} className={"primaryColumn"}>
              <CharacterDefences character={character} />
              <CharacterWallet character={character} />
            </Col>
            <Col sm ={4} className={"primaryColumn"}>
              <CharacterPersonalCharacteristics character={character} />
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