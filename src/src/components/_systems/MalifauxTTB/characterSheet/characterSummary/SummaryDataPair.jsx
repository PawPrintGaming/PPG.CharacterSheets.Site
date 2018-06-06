import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap'

class SummaryDataPair extends Component {
  render(){
    const {name, value, colSize} = this.props;
    return (
      <Col xs={colSize} className={"summaryDataPair"}>
        <Row className={"name"}>{name}</Row>
        <Row className={"value"}>{value}</Row>
      </Col>
    )
  }
}

SummaryDataPair.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired,
  colSize: PropTypes.number.isRequired
}

export default SummaryDataPair