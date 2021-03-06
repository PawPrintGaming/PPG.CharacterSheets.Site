import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import {getDestinyStepsFulfilled} from '../../metaDataUtils';
import NumericalStepModalEditor from '../../../../inlineEditors/modalEditors/NumericalStepModalEditor';
import InlineTextEditor from '../../../../inlineEditors/textEditors/InlineTextEditor';
import {updateCharacterProperty, updateCharacterMetaData, updateCharacterWallet} from '../../../../characterSheet/updateCharacterSheetInvocations';
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

  destinyStepsFulfilled = (destinyStepsFulfilled, onUpdateMetaData) => (
    <NumericalStepModalEditor
      id={"destinyStepsFulfilled"}
      className={"destinyStepsFulfilled col"}
      text={this.renderDestinyStepsFulfilledMarks(destinyStepsFulfilled)}
      title={"Destiny Steps Fulfilled"}
      value={destinyStepsFulfilled}
      change={(value) => onUpdateMetaData(keys.DESTINYSTEPSFULFILLED, value)}
      min={0} max={5}
    />
  )

  buildSummaryDataPairWithChild = (title, child, colSize = 12) => (
    <Col xs={colSize} className={"summaryDataPair"}>
      <Row className={"name"}>{title}</Row>
      <Row className={"value"}>{child}</Row>
    </Col>
  )

  buildSummaryDataPair = (title, value, colSize = 12) => this.buildSummaryDataPairWithChild(
    title, value || '-', colSize
  )
  
  buildSummaryDataPairWithInlineEdit = (title, value, key, onUpdate, colSize = 12, inputType = 'text', prefix = '', formatter = null) => this.buildSummaryDataPairWithChild(
    title, <InlineTextEditor text={value} param={key} change={({text}) => onUpdate(key, text)} inputType={inputType} prefix={prefix} formatter={formatter} />, colSize
  )
  
  render() {
    const {character, onUpdateMetaData, onUpdateProperty, onUpdateWallet} = this.props;
    const {characterName, playerName, metaData, wallets} = character;
    const destinyStepsFulfilled = getDestinyStepsFulfilled(character.metaData);
    return (
      <Col className={"characterSummary"}>
        <Row>
          <Col md={6} className={"panel leftPanel"}>
            <Row>
              {this.buildSummaryDataPairWithInlineEdit('Fated Name', characterName, keys.CHARACTERNAME, onUpdateProperty)}
            </Row>
            <Row>
              {this.buildSummaryDataPair("Current Pursuit", getKeyFromMetaData(keys.CURRENTPURSUIT, metaData), 6)}
              {this.buildSummaryDataPair("Station", getKeyFromMetaData(keys.STATION, metaData), 6)}
            </Row>
          </Col>
          <Col md={6} className={"panel rightPanel"}>
            <Row>
              {this.buildSummaryDataPair("Player Name", playerName, 6)}
              {this.buildSummaryDataPairWithInlineEdit(
                "Guild Scrip", `${getKeyFromMetaData(keys.wallets.GUILDSCRIP, wallets) || 0}`,
                keys.wallets.GUILDSCRIP,
                (key, value) => onUpdateWallet(key, value),
                6,
                'number',
                '\u00A7',
                (value) => Number(value).toFixed(2)
              )}
            </Row>
            <Row>
              {this.buildSummaryDataPair("Destiny Steps Fulfilled", this.destinyStepsFulfilled(destinyStepsFulfilled, onUpdateMetaData), 6)}
              {this.buildSummaryDataPairWithInlineEdit("Exp.", getKeyFromMetaData(keys.EXPERIENCE, metaData, 0), keys.EXPERIENCE, onUpdateMetaData, 6, 'number')}
            </Row>
          </Col>
        </Row>
      </Col>
    )
  }
}

CharacterSummary.propTypes = {
  character: PropTypes.object.isRequired,
  onUpdateMetaData: PropTypes.func.isRequired,
  onUpdateProperty: PropTypes.func.isRequired,
  onUpdateWallet: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  const {character} = props;
  return {
    onUpdateMetaData: (key, value) => updateCharacterMetaData(character.id, key, value),
    onUpdateProperty: (key, value) => updateCharacterProperty(character.id, key, value),
    onUpdateWallet: (key, value) => updateCharacterWallet(character.id, key, value)
  }
}

export default connect(mapStateToProps)(CharacterSummary)