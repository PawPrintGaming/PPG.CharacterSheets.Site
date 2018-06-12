import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';
import {groupStats} from '../../statUtils';
import BlockHeader from '../blockHeader/BlockHeader';


export class CharacterStats extends Component {
  buildStatDataPair = (key, name, value) => (
    <Row key={key} className={"statDataPair"}>
      <Col xs={6} className={"name"}>{name}</Col>
      <Col xs={6} className={"value"}>{value}</Col>
    </Row>
  )
  render() {
    const {stats, statSets} = this.props;
    const {physical, mental} = groupStats(stats, statSets);
    return (
      <Col className={"characterStats"} sm="6">
        <BlockHeader subHeaderLeft={"Physical"} header={"Aspects"} subHeaderRight={"Mental"}/>
        <Row>
          <Col>
            {physical.map(stat => this.buildStatDataPair(stat.key, stat.key, stat.value))}
          </Col>
          <Col>
            {mental.map(stat => this.buildStatDataPair(stat.key, stat.key, stat.value))}
          </Col>
        </Row>
      </Col>
    )
  }
}

CharacterStats.proptypes = {
  stats: PropTypes.array.isRequired
}

export default CharacterStats