import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';

export class StatDataPair extends Component {
  render() {
    const {name, value} = this.props;
    return (
      <Row className={"statDataPair"}>
        <Col className={"name"}>{name}</Col>
        <Col className={"value"}>{value}</Col>
      </Row>
    )
  }
}

StatDataPair.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired
}

export default StatDataPair