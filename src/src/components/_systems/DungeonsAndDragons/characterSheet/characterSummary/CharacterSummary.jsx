import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import InlineTextEditor from '../../../../inlineEditors/textEditors/InlineTextEditor';
import {updateCharacterProperty, updateCharacterMetaData} from '../../../../characterSheet/updateCharacterSheetInvocations';
import {getKeyFromMetaData} from '../../../../../metaDataUtils';
import * as keys from '../../metaDataKeys'

export class CharacterSummary extends Component {
  buildSummaryDataPairWithChild = (title, child, md = 12, sm = 12) => (
    <Col sm={sm} md={md} className={`summaryDataPair ${title}`}>
      <Row className={"value"}>{child}</Row>
      <Row className={"name"}>{title}</Row>
    </Col>
  )
  buildSummaryDataPair = (title, value, md = 12, sm = 12) => this.buildSummaryDataPairWithChild(title, value || '-', md, sm)

  buildSummaryDataPairWithInlineEdit = (title, value, key, onUpdate, md = 12, sm = 12, inputType = 'text', prefix = '', formatter = null, step = 1) => this.buildSummaryDataPairWithChild(
    title, <InlineTextEditor text={value} param={key} change={({text}) => onUpdate(key, text)} inputType={inputType} prefix={prefix} formatter={formatter} step={step} />, md, sm
  )

  render() {
    const {character, onUpdateProperty, onUpdateMetaData} = this.props;
    const {characterName, playerName} = character;
    return (
      <Row className={"characterSummary"}>
        {this.buildSummaryDataPairWithInlineEdit("Character Name", characterName, keys.CHARACTERNAME, onUpdateProperty, 5)}
        <Col>
          <Row>
            {this.buildSummaryDataPair("Class", getKeyFromMetaData(keys.CLASS, character.metaData), 2)} {/* TODO Support for multiclassing */}
            {this.buildSummaryDataPair("Level", getKeyFromMetaData(keys.LEVEL, character.metaData), 1)}
            {this.buildSummaryDataPair("Background", getKeyFromMetaData(keys.BACKGROUND, character.metaData), 4)}
            {this.buildSummaryDataPair("PlayerName", playerName, 3)}
          </Row>
          <Row>
            {this.buildSummaryDataPair("Race", getKeyFromMetaData(keys.RACE, character.metaData), 3)}
            {this.buildSummaryDataPair("Alignment", getKeyFromMetaData(keys.ALIGNMENT, character.metaData), 4)}
            {this.buildSummaryDataPairWithInlineEdit("Experience", getKeyFromMetaData(keys.EXPERIENCE, character.metaData, 0), keys.EXPERIENCE, onUpdateMetaData, 3, 12, "number", '', null, 10)}
          </Row>
        </Col>
      </Row>
    )
  }
}

CharacterSummary.propTypes = {
  character: PropTypes.object.isRequired,
  onUpdateProperty: PropTypes.func.isRequired,
  onUpdateMetaData: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  const {character} = props;
  return {
    onUpdateProperty: (key, value) => updateCharacterProperty(character.id, key, value),
    onUpdateMetaData: (key, value) => updateCharacterMetaData(character.id, key, value)
  }
}

export default connect(mapStateToProps)(CharacterSummary)