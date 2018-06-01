import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import caretDown from '@fortawesome/fontawesome-free-solid/faCaretDown';

export class BlockHeader extends Component {
  render() {
    const {subHeaderLeft, header, subHeaderRight} = this.props;
    return (
      <Row className={"blockHeader"}>
        <Col className={"subHeader left"}>{subHeaderLeft}</Col>
        <Col>
          <Row className={"standOut"}>{header}</Row>
          <Row className={"standOutFooter"}>
            <span><FontAwesomeIcon icon={caretDown} /></span>
          </Row>
        </Col>
        <Col className={"subHeader right"}>{subHeaderRight}</Col>
      </Row>
    )
  }
}

BlockHeader.propTypes = {
  subHeaderLeft: PropTypes.string,
  header: PropTypes.string.isRequired,
  subHeaderRight: PropTypes.string
}

export default BlockHeader