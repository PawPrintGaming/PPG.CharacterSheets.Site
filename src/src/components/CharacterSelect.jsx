import React, {Component} from 'react';
import Loader from './Loader';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {charactersRequestAction} from '../ducks/characterSelect';
import {Row} from 'reactstrap';
import './CharacterSelect.css';

export class CharacterSelect extends Component {
  render () {
    const {
      isFetching, errorMessage,
      charactersInfo,
      noAccountsDispatch
    } = this.props;
    if(!charactersInfo.length > 0 && !isFetching) {
      noAccountsDispatch()
    }
    return (
      <div className={"characterSelect"}>
        <Row>
          <Loader isFetching={isFetching} errorMessage={errorMessage}>
            <p>This is the Character Selector</p>
          </Loader>
        </Row>
      </div>
    )    
  }
};

CharacterSelect.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  charactersInfo: PropTypes.array.isRequired,
  noAccountsDispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    isFetching: state.characterSelect.isFetching,
    errorMessage: state.characterSelect.errorMessage,
    charactersInfo: state.characterSelect.charactersInfo || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    noAccountsDispatch: () => {
      dispatch(charactersRequestAction())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelect);