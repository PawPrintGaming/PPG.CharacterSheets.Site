import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';
import {getClass, getLevel, getBackground, getRace, getAligment} from '../../metaDataUtils';
import InlineEditor from '../../../../inlineEditors/InlineEditor';
import {updateCharacterProperty} from '../../../../characterSheet/updateCharacterSheetInvocations';

export class CharacterSummary extends Component {
  buildSummaryDataPair = (title, value, colSize = 12) => (
    <Col sm={colSize} className={`summaryDataPair ${title}`}>
      <Row className={"value"}>{value || '-'}</Row>
      <Row className={"name"}>{title.toUpperCase()}</Row>
    </Col>
  )

  buildSummaryDataPairWithInlineEdit = (character, title, value, param, colSize = 12) => (
    <Col xs={colSize} className={`summaryDataPair ${title}`}>
      <Row className={"value"}>
        <InlineEditor value={value} param={param} change={({text}) => updateCharacterProperty(character.id, param, text)} />
      </Row>
      <Row className={"name"}>{title}</Row>
    </Col>
  )

  render() {
    const {character} = this.props;
    const {characterName, playerName, experience} = character;
    const characterClass = getClass(character.metaData);
    const characterLevel = getLevel(character.metaData);
    const characterBackground = getBackground(character.metaData);
    const characterRace = getRace(character.metaData);
    const characterAlignment = getAligment(character.metaData);
    return (
      <Row className={"characterSummary DnD"}>
        {this.buildSummaryDataPairWithInlineEdit(character, "Character Name", characterName, "CharacterName", 5)}
        {/* {this.buildSummaryDataPair("Character Name", characterName, 5)} */}
        <Col>
          <Row>
            {this.buildSummaryDataPair("Class", characterClass, 2)} {/* TODO Support for multiclassing */}
            {this.buildSummaryDataPair("Level", characterLevel, 1)}
            {this.buildSummaryDataPair("Background", characterBackground, 4)}
            {this.buildSummaryDataPair("PlayerName", playerName, 3)}
          </Row>
          <Row>
            {this.buildSummaryDataPair("Race", characterRace, 3)}
            {this.buildSummaryDataPair("Alignment", characterAlignment, 4)}
            {this.buildSummaryDataPair("Experience", experience, 3)}
          </Row>
        </Col>
      </Row>
    )
  }
}

CharacterSummary.propTypes = {
  character: PropTypes.object.isRequired
}

export default CharacterSummary