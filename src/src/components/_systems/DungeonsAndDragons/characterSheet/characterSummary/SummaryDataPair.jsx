import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap'

class SummaryDataPair extends Component {
  render(){
    const {name, value, colSize} = this.props;
    return (
      <Col sm={colSize} className={`summaryDataPair ${name}`}>
        <Row className={"value"}>{value}</Row>
        <Row className={"name"}>{name.toUpperCase()}</Row>
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