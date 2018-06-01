import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StatDataPair from './StatDataPair';
import {Col, Row} from 'reactstrap';
import './CharacterStats.css';
import {groupStats} from '../statUtils';
import BlockHeader from '../blockHeader/BlockHeader';


export class CharacterStats extends Component {
  render() {
    const {stats} = this.props;
    const {physical, mental} = groupStats(stats);
    return (
      <Col className={"characterStats Malifaux"} sm="6">
        <BlockHeader subHeaderLeft={"Physical"} header={"Aspects"} subHeaderRight={"Mental"}/>
        <Row>
          <Col>
            {physical.map(stat => {
              return <StatDataPair key={stat.key} name={stat.key} value={stat.value} />
            })}
          </Col>
          <Col>
            {mental.map(stat => {
              return <StatDataPair key={stat.key} name={stat.key} value={stat.value} />
            })}
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