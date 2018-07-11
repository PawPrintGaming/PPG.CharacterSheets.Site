import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';
import {getDestinyStepsFulfilled} from '../../metaDataUtils';
import NumericalStepModalEditor from '../../../../inlineEditors/modalEditors/NumericalStepModalEditor';
import InlineTextEditor from '../../../../inlineEditors/textEditors/InlineTextEditor';
import {updateCharacterProperty, updateCharacterMetaData} from '../../../../characterSheet/updateCharacterSheetInvocations';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import unfullfilledStepIcon from '@fortawesome/fontawesome-free-regular/faCircle';
import fullfilledStepIcon from '@fortawesome/fontawesome-free-solid/faCircle';
import {getKeyFromMetaData} from '../../../../../metaDataUtils';
import * as keys from '../../metaDataKeys';

export class CharacterSummary extends Component {
  renderDestinyStepsFulfilledMarks = (destinyStepsFulfilled, totalSteps = 5) => {
    let marks = []
    for(var mark = 1; mark < totalSteps+1; mark++) {
      let icon = mark <= destinyStepsFulfilled
        ? fullfilledStepIcon
        : unfullfilledStepIcon
        marks.push(<FontAwesomeIcon key={mark} icon={icon} />)
    }
    return marks;
  }

  destinyStepsFulfilled = (characterId, destinyStepsFulfilled) => (
    <NumericalStepModalEditor
      id={"destinyStepsFulfilled"}
      className={"destinyStepsFulfilled col"}
      text={this.renderDestinyStepsFulfilledMarks(destinyStepsFulfilled)}
      title={"Destiny Steps Fulfilled"}
      value={destinyStepsFulfilled}
      change={value => updateCharacterMetaData(characterId, "DestinyStepsFulfilled", value)}
      min={0} max={5}
    />
  )

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
        <InlineTextEditor text={value} param={param} change={({text}) => updateCharacterProperty(character.id, param, text)} />
      </Row>
    </Col>
  )
  
  render() {
    const {character} = this.props;
    const {characterName, playerName, guildScrip, experience, metaData} = character;
    const currentPursuit = getKeyFromMetaData(keys.CURRENTPURSUIT, metaData);
    const station = getKeyFromMetaData(keys.STATION, metaData);
    const destinyStepsFulfilled = getDestinyStepsFulfilled(character.metaData);
    return (
      <Col className={"characterSummary"}>
        <Row>
          <Col md={6} className={"panel leftPanel"}>
            <Row>
              {this.buildSummaryDataPairWithInlineEdit(character, 'Fated Name', characterName, 'CharacterName')}
            </Row>
            <Row>
              {this.buildSummaryDataPair("Current Pursuit", currentPursuit, 6)}
              {this.buildSummaryDataPair("Station", station, 6)}
            </Row>
          </Col>
          <Col md={6} className={"panel rightPanel"}>
            <Row>
              {this.buildSummaryDataPair("Player Name", playerName, 6)}
              {this.buildSummaryDataPair("GuildScrip", `\u00A7${guildScrip || 0}`, 6)}
            </Row>
            <Row>
              {this.buildSummaryDataPair("Destiny Steps Fulfilled", this.destinyStepsFulfilled(character.id, destinyStepsFulfilled), 6)}
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