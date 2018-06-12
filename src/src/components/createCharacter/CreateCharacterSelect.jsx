import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Col, Row} from 'reactstrap';
import Select from 'react-select';
import Loader from '../loader/Loader';

export class CreateCharacterSelect extends Component {
  buildOptions(ruleSetInfos) {
    return ruleSetInfos.map(ruleSetInfo => {
      return { value: ruleSetInfo.ruleSet, label: ruleSetInfo.name}
    });
  }

  render() {
    const {ruleSetInfos, history, onRuleSetSelect} = this.props;
    if (ruleSetInfos === undefined) {
      return <Loader isFetching={true} />
    }
    return (
      <div>
        <Row className={"mx-0"}>
          <Col className={"text-center mt-3"}>
            <Select
              name="createCharacterRuleSetSelect"
              placeholder="Select Rule Set"
              options={this.buildOptions(ruleSetInfos)}
              onChange={summary => onRuleSetSelect(history, summary)}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

CreateCharacterSelect.propTypes = {
  ruleSetInfos: PropTypes.array.isRequired,
  onRuleSetSelect: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    ruleSetInfos: state.ruleSetsStore.ruleSetInfos,
    onRuleSetSelect: (history, summary) => {
      history.push(`/create/character/${summary.value}`)
    }
  }
}

export default withRouter(connect(mapStateToProps)(CreateCharacterSelect))