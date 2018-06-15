import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';
import './Loader.css';
import {Alert} from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import loadingIcon from '@fortawesome/fontawesome-free-solid/faCog';

const Loader = ({isFetching, errorMessage, children}) => {
  if (errorMessage){
    return (
      <Col className={"text-center"}>
        <Alert color={"danger"} className={"alerter"}>An error occured: {errorMessage}</Alert>
      </Col>
    )
  }
  if (isFetching) {
    return (
      <Col className={"loading"}>
        <Row>
          <Col className={"left"}>
            <FontAwesomeIcon icon={loadingIcon} className={"fa-spin loading-svg enlarge"} />
          </Col>
          <Col className={"right"}>
            <Row><FontAwesomeIcon icon={loadingIcon} className={"fa-spin loading-svg"} /></Row>
            <Row><FontAwesomeIcon icon={loadingIcon} className={"fa-spin loading-svg"} /></Row>
          </Col>
        </Row>
      </Col>
    )
  }
  return children || <p>Nothing here!</p>;
}

Loader.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}

export default Loader