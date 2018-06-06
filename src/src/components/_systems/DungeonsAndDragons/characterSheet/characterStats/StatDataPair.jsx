import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';
import {calculateModifierForStat} from '../../statUtils'

export const StatDataPair =({name, value}) => (
  <Col className={"statDataPair"} xs={3} sm={12}>
    <Row className={"name"}>{name.toUpperCase()}</Row>
    <Row className={"value"}>{value}</Row>
    <Row><Col col="4" className={"modifier"}>{calculateModifierForStat(value)}</Col></Row>
  </Col>
)

StatDataPair.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired
}

export default StatDataPair