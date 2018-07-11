import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';
import InlineTextEditor from '../../../../inlineEditors/textEditors/InlineTextEditor';
import {updateCharacterProperty} from '../../../../characterSheet/updateCharacterSheetInvocations';
import {getKeyFromMetaData} from '../../../../../metaDataUtils';
import * as keys from '../../metaDataKeys'

export class CharacterSummary extends Component {
  buildSummaryDataPair = (title, value, sm = 12) => (
    <Col sm={sm} className={`summaryDataPair ${title}`}>
      <Row className={"value"}>{value || '-'}</Row>
      <Row className={"name"}>{title.toUpperCase()}</Row>
    </Col>
  )

  buildSummaryDataPairWithInlineEdit = (character, title, value, param, md = 12) => (
    <Col md={md} className={`summaryDataPair ${title}`}>
      <Row className={"value"}>
        <InlineTextEditor text={value} param={param} change={({text}) => updateCharacterProperty(character.id, param, text)} />
      </Row>
      <Row className={"name"}>{title}</Row>
    </Col>
  )

  render() {
    const {character} = this.props;
    const {characterName, playerName, experience} = character;
    const characterClass = getKeyFromMetaData(keys.CLASS, character.metaData);
    const characterLevel = getKeyFromMetaData(keys.LEVEL, character.metaData);
    const characterBackground = getKeyFromMetaData(keys.BACKGROUND, character.metaData);
    const characterRace = getKeyFromMetaData(keys.RACE, character.metaData);
    const characterAlignment = getKeyFromMetaData(keys.ALIGNMENT, character.metaData);
    return (
      <Row className={"characterSummary DnD"}>
        {this.buildSummaryDataPairWithInlineEdit(character, "Character Name", characterName, "CharacterName", 5)}
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