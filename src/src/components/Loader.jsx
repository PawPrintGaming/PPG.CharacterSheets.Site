import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import loading from '../loading.svg'
import './Loader.css';

const Loader = ({isFetching, errorMessage, children}) => {
  if (errorMessage){
    return <p>An error occured: {errorMessage}</p>
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