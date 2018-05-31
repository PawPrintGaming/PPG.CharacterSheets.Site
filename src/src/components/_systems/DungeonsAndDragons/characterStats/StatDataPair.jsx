import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';
import {calculateModifierForStat} from '../statUtils'

export class StatDataPair extends Component {
  render() {
    const {name, value} = this.props;
    return (
      <Row className={"statDataPair"}>
        <Col>
          <Row className={"name"}>{name}</Row>
          <Row className={"value"}>{value}</Row>
          <Row><Col col="4" className={"modifier"}>{calculateModifierForStat(value)}</Col></Row>
        </Col>
      </Row>
    )
  }
}

StatDataPair.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired
}

export default StatDataPair