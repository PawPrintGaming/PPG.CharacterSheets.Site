import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';
import {getCurrentPursuit, getStation, getDestinyStepsFulfilled} from '../../metaDataUtils';
import NumericalStepModalEditor from '../../../../inlineEditors/modalEditors/NumericalStepModalEditor';
import InlineTextEditor from '../../../../inlineEditors/textEditors/InlineTextEditor';
import {updateCharacterProperty, updateCharacterMetaData} from '../../../../characterSheet/updateCharacterSheetInvocations';
import debounce from '../../../../../debounce';
import * as d3 from 'd3';

export class CharacterSummary extends Component {
  renderDestinyStepsFulfilledGraphic = (characterId, stepsFulfilled, totalSteps = 5) => {
    var graphic = d3.select('#destinyStepsFulfilledGraphic');

    graphic.selectAll('.step').remove();

    const height = parseInt(graphic.style('height'), 10);
    const width = parseInt(graphic.style('width'), 10);

    const markSpace = width/(totalSteps+1);

    for(var mark = 1; mark < totalSteps+1; mark++) {
      graphic.append('circle')
        .attr('cx', mark*markSpace)
        .attr('cy', height/2)
        .attr('r', (height*0.75)/2)
        .attr('class', `step ${mark <= stepsFulfilled ? 'fulfilled' : 'unfulfilled'}`);
    }
  }

  destinyStepsFulfilledPlaceholder = (characterId, destinyStepsFulfilled) => (
    <NumericalStepModalEditor
      id={"destinyStepsFulfilledGraphicEditor"}
      text={<svg ref={node => this.node = node} id={"destinyStepsFulfilledGraphic"} className={"destinyStepsFulfilledGraphic"}></svg>}
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
    const {characterName, playerName, guildScrip, experience} = character;
    const currentPursuit = getCurrentPursuit(character.metaData);
    const station = getStation(character.metaData);
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
              {this.buildSummaryDataPair("Destiny Steps Fulfilled", this.destinyStepsFulfilledPlaceholder(character.id, destinyStepsFulfilled), 6)}
              {this.buildSummaryDataPair("Exp.", experience, 6)}
            </Row>
          </Col>
        </Row>
      </Col>
    )
  }

  componentDidMount = () => {
    const {character} = this.props
    const destinyStepsFulfilled = getDestinyStepsFulfilled(character.metaData);
    debounce(this.renderDestinyStepsFulfilledGraphic(character.id, destinyStepsFulfilled));
    window.addEventListener('resize', () => debounce(this.renderDestinyStepsFulfilledGraphic(character.id, destinyStepsFulfilled)));
  }

  componentDidUpdate = () => {
    const {character} = this.props
    const destinyStepsFulfilled = getDestinyStepsFulfilled(character.metaData);
    debounce(this.renderDestinyStepsFulfilledGraphic(character.id, destinyStepsFulfilled));
  }
}

CharacterSummary.propTypes = {
  character: PropTypes.object.isRequired
}

export default CharacterSummary