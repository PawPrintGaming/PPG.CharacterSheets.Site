import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './CharacterStats.css';
import {Col, Row} from 'reactstrap';
import StatDataPair from './StatDataPair';

export class CharactersStats extends Component {
  render() {
    const {stats} = this.props
    return (
      <Col sm={2}>
        <Row className={"characterStats DnD"}>
          {stats.map(stat => {
            return <StatDataPair key={stat.key} name={stat.key} value={stat.value} />
          })}
        </Row>
      </Col>
    )
  }
}

CharactersStats.propTypes = {
  stats: PropTypes.array.isRequired
}

export default CharactersStats