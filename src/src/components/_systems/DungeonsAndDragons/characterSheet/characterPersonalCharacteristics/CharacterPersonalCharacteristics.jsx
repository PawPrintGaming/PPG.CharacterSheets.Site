import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap'
import {getKeyFromMetaData} from '../../../../../metaDataUtils';
import * as keys from '../../metaDataKeys';
import InlineTextEditor from '../../../../inlineEditors/textEditors/InlineTextEditor';
import {updateCharacterMetaData} from '../../../../characterSheet/updateCharacterSheetInvocations';

export class CharacterPersonalCharacteristics extends Component {
  renderCharacteristicWithEditor = (key, title, metaData, onUpdateCharacteristic, className) => (
    <Row>
      <Col className={`characteristicPair${className ? ` ${className}` : ''}`}>
        <Row className={"value"}>
          <InlineTextEditor text={getKeyFromMetaData(key, metaData)} param={key} editingElement={"textarea"} change={({text}) => onUpdateCharacteristic(key, text)}/>
        </Row>
        <Row className={"title"}>{title.toUpperCase()}</Row>
      </Col>
    </Row>
  )

  render() {
    const {character, onUpdateCharacteristic} = this.props;
    const {metaData} = character;
    return (
        <Row className={"mx-0"}>
          <Col className={"characterPersonalCharacteristics"}>
            {this.renderCharacteristicWithEditor(keys.PERSONALITYTRAITS, 'Personality Traits', metaData, onUpdateCharacteristic, 'first')}
            {this.renderCharacteristicWithEditor(keys.IDEALS, 'Ideals', metaData, onUpdateCharacteristic)}
            {this.renderCharacteristicWithEditor(keys.BONDS, 'Bonds', metaData, onUpdateCharacteristic)}
            {this.renderCharacteristicWithEditor(keys.FLAWS, 'Flaws', metaData, onUpdateCharacteristic, 'last')}
          </Col>
        </Row>
    )
  }
}

CharacterPersonalCharacteristics.propTypes = {
  character: PropTypes.object.isRequired,
  onUpdateCharacteristic: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  const {character} = props;
  return {
    onUpdateCharacteristic: (key, value) => updateCharacterMetaData(character.id, key, value)
  }
}

export default connect(mapStateToProps)(CharacterPersonalCharacteristics)