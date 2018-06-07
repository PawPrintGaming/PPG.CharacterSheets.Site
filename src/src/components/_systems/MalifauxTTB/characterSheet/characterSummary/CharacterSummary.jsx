import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';
import InlineEdit from 'react-edit-inplace';
import {getCurrentPursuit, getStation, getDestinyStepsFulfilled} from '../../metaDataUtils';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import editableIcon from '@fortawesome/fontawesome-free-solid/faEdit';
import InlineEditor from '../../../../inlineEditors/InlineEditor';

export class CharacterSummary extends Component {
  buildSummaryDataPair = (character, title, value, colSize = 12) => (
    <Col xs={colSize} className={"summaryDataPair"}>
      <Row className={"name"}>{title}</Row>
      <Row className={"value"}>{value || '-'}</Row>
    </Col>
  )
  
  buildSummaryDataPairWithInlineEdit = (character, title, value, param, colSize = 12) => (
    <Col xs={colSize} className={"summaryDataPair"}>
      <Row className={"name"}>{title}</Row>
      <Row className={"value"}>
        {console.log(param)}
        <InlineEditor value={value} param={param} change={({text}) => alert(`${param}, ${text}`)} />
        {/* <InlineEdit text={value || '-'} paramName={"text"} change={({text}) => alert(`${key}, ${text}`)} activeClassName={"editing"} className={key}/>
        <FontAwesomeIcon icon={editableIcon} className={"editable"} onClick={() => document.getElementsByClassName(key)[0].click()}/> */}
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
              {this.buildSummaryDataPairWithInlineEdit(character, 'Fated Name', characterName, 'characterName')}
            </Row>
            <Row>
              {this.buildSummaryDataPair(character, "Current Pursuit", currentPursuit, 6)}
              {this.buildSummaryDataPair(character, "Station", station, 6)}
            </Row>
          </Col>
          <Col sm="6" className={"rightPanel"}>
            <Row>
              {this.buildSummaryDataPair(character, "Player Name", playerName, 6)}
              {this.buildSummaryDataPair(character, "GuildScrip", `\u00A7${guildScrip || 0}`, 6)}
            </Row>
            <Row>
              {this.buildSummaryDataPair(character, "Destiny Steps Fulfilled", `${destinyStepsFulfilled}`, 6)}
              {this.buildSummaryDataPair(character, "Exp.", experience, 6)}
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