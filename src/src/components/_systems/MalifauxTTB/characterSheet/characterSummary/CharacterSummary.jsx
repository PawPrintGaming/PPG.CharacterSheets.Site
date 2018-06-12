import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';
import {getCurrentPursuit, getStation, getDestinyStepsFulfilled} from '../../metaDataUtils';
import InlineEditor from '../../../../inlineEditors/InlineEditor';
import {updateCharacterProperty} from '../../../../characterSheet/updateCharacterSheetInvocations';

export class CharacterSummary extends Component {
  buildSummaryDataPair = (title, value, colSize = 12) => (
    <Col xs={colSize} className={"summaryDataPair"}>
      <Row className={"name"}>{title}</Row>
      <Row className={"value"}>{value || '-'}</Row>
    </Col>
  )
  
  buildSummaryDataPairWithInlineEdit = (character, title, value, param, colSize = 12) => (
    <Col xs={colSize} className={"summaryDataPair"}>
      <Row className={"name"}>{title}</Row>
      <Row className={"value"}>
        <InlineEditor value={value} param={param} change={({text}) => updateCharacterProperty(character.id, param, text)} />
      </Row>
    </Col>
  )
  
  render() {
    const {character} = this.props;
    const {characterName, playerName, guildScrip, experience} = character;
    const currentPursuit = getCurrentPursuit(character.metaData);
    const station = getStation(character.metaData);
    const destinyStepsFulfilled = getDestinyStepsFulfilled(character.metaData);
    return (
      <Col className={"characterSummary"}>
        <Row>
          <Col sm="6" className={"leftPanel"}>
            <Row>
              {this.buildSummaryDataPairWithInlineEdit(character, 'Fated Name', characterName, 'CharacterName')}
            </Row>
            <Row>
              {this.buildSummaryDataPair("Current Pursuit", currentPursuit, 6)}
              {this.buildSummaryDataPair("Station", station, 6)}
            </Row>
          </Col>
          <Col sm="6" className={"rightPanel"}>
            <Row>
              {this.buildSummaryDataPair("Player Name", playerName, 6)}
              {this.buildSummaryDataPair("GuildScrip", `\u00A7${guildScrip || 0}`, 6)}
            </Row>
            <Row>
              {this.buildSummaryDataPair("Destiny Steps Fulfilled", `${destinyStepsFulfilled}`, 6)}
              {this.buildSummaryDataPair("Exp.", experience, 6)}
            </Row>
          </Col>
        </Row>
      </Col>
    )
  }
}

CharacterSummary.propTypes = {
  character: PropTypes.object.isRequired
}

export default CharacterSummary