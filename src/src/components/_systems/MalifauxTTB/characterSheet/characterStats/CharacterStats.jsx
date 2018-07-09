import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';
import {groupStats} from '../../statUtils';
import BlockHeader from '../blockHeader/BlockHeader';
import InlineTextEditor from '../../../../inlineEditors/textEditors/InlineTextEditor';
import {updateCharacterStat} from '../../../../characterSheet/updateCharacterSheetInvocations';


export class CharacterStats extends Component {
  buildStatDataPair = (id, key, name, value) => (
    <Row key={key} className={"statDataPair"}>
      <Col xs={8} className={"name"}>{name}</Col>
      <Col xs={4} className={"value"}><InlineTextEditor text={value} inputType={"number"} title={name} param={name} change={({text}) => updateCharacterStat(id, name, text)}/></Col>
    </Row>
  )
  render() {
    const {character, statSets} = this.props;
    const {physical, mental} = groupStats(character.stats, statSets);
    return (
      <Col className={"characterStats panel leftPanel"} sm={12} md={6}>
        <BlockHeader subHeaderLeft={"Physical"} header={"Aspects"} subHeaderRight={"Mental"}/>
        <Row className={"characterStatsTable"}>
          <Col>
            {physical.map(stat => this.buildStatDataPair(character.id, stat.key, stat.key, stat.value))}
          </Col>
          <Col>
            {mental.map(stat => this.buildStatDataPair(character.id, stat.key, stat.key, stat.value))}
          </Col>
        </Row>
      </Col>
    )
  }
}

CharacterStats.proptypes = {
  character: PropTypes.object.isRequired,
  statSets: PropTypes.array.isRequired
}

export default CharacterStats