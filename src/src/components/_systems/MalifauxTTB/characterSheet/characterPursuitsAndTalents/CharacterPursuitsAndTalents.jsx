import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';
import * as keys from '../../metaDataKeys';
import InlineTextEditor from '../../../../inlineEditors/textEditors/InlineTextEditor';

export class CharacterPursuitsAndTalents extends Component {
  renderPursuit = (pursuit, talents) => {
    const ventureTalentIndex = talents.findIndex(talent => talent.metaData.some(metaData => metaData.key === keys.talents.VENTURETALENT));
    const ventureTalent = ventureTalentIndex === -1
      ? null
      : talents[ventureTalentIndex];
    const pursuitTalents = ventureTalentIndex === -1
      ? null
      : [...talents.slice(0, ventureTalentIndex), ...talents.slice(ventureTalentIndex+1)];
    return (
      <Row key={pursuit.name} className={"pursuit mx-0"}>
        <Col>
          <Row>
            <Col xs={6} sm={3} className={"pursuitHeader"}>Pursuit</Col>
            <Col xs={6} sm={1} className={"pursuitHeader"}>Steps</Col>
            <Col xs={6} sm={8} className={"pursuitHeader ventureTalent"}>Venture Talent</Col>
          </Row>
          <Row>
            <Col xs={6} sm={3} className={"pursuitValue"}>{pursuit.name}</Col>
            <Col xs={6} sm={1} className={"pursuitValue"}>
              <InlineTextEditor text={pursuit.rank} change={({text}) => console.log(text)} param={`${pursuit.name}-rank`} inputType={"number"}/>
            </Col>
            <Col xs={6} sm={3} className={"pursuitValue"}>
              <InlineTextEditor text={ventureTalent.name} change={({text}) => console.log(text)} param={`${pursuit.name}-venturename`}/>
            </Col>
            <Col xs={6} sm={5} className={"pursuitValue description"}>
              <InlineTextEditor text={ventureTalent.description} change={({text}) => console.log(text)} param={`${pursuit.name}-venturedescription`}/>
            </Col>
          </Row>
          {
            pursuitTalents.length > 0
              ? <Row>
                  <Col xs={3} className={"pursuitHeader"}>Talent</Col>
                  <Col className={"pursuitHeader"}>Description</Col>
                </Row>
              : null
          }
          {pursuitTalents.map(talent =>
            <Row key={talent.name} className={"talent"}>
              <Col xs={3} className={"pursuitValue"}>
                <InlineTextEditor text={talent.name} change={({text}) => console.log(text)} param={`${talent.name}-name`}/>
              </Col>
              <Col className={"pursuitValue description"}>
                <InlineTextEditor text={talent.description} change={({text}) => console.log(text)} param={`${talent.name}-description`}/>
              </Col>
            </Row>)
          }
        </Col>
      </Row>
    )
  }

  render() {
    const {classes, abilities} = this.props.character;
    return (
      <Col className={"characterPursuitsAndTalents"}>
        <Row className={"pursuitsHeader"}>Pursuits</Row>
        {
          classes.map(pursuit => this.renderPursuit(
            pursuit,
            abilities.filter(
              talent => talent.metaData.some(data => data.key === keys.talents.RELATEDPURSUIT)
                ? talent.metaData.find(data => data.key === keys.talents.RELATEDPURSUIT).value === pursuit.name
                : false
            )
          ))
        }
      </Col>
    )   
  }
}

CharacterPursuitsAndTalents.propTypes = {
  character: PropTypes.object.isRequired
}

export default CharacterPursuitsAndTalents;