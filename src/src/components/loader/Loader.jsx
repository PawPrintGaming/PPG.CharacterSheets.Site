import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import loading from '../../loading.svg'
import './Loader.css';

const Loader = ({isFetching, errorMessage, children}) => {
  if (errorMessage){
    return (
      <Col className={"text-center"}>
        An error occured: {errorMessage}
      </Col>
    )
  }
  if (isFetching) {
    return (
      <Col className={"text-center"}>
        <img src={loading} alt="loading" className={"loading-svg"}/>
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