import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Col, Collapse, Container, Form, InputGroup, InputGroupAddon, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import chevronCircleDown from '@fortawesome/fontawesome-free-solid/faChevronCircleDown';
import './ManageRuleSets.css';
import {createRuleSetInfo} from './manageRuleSetsInvocations'

export class ManageRuleSets extends Component {
  constructor(props) {
    super(props)

    this.toggleCreateRuleSet = this.toggleCreateRuleSet.bind(this);
    this.state = {
      createRuleSetIsOpen: false
    }
  }

  toggleCreateRuleSet() {
    this.setState({
      ...this.state,
      createRuleSetIsOpen: !this.state.createRuleSetIsOpen
    });
  }

  ruleSetOptions(ruleSets) {
    return ruleSets.map(ruleSet => <option key={ruleSet} value={ruleSet}>{ruleSet}</option>)
  }

  newRuleSetForm(props) {
    const {availableRuleSetKeys, onSubmit, handleSubmit, pristine, submitting} = this.props;
    return !availableRuleSetKeys.length > 0
      ? null
      : <Col className={"createRuleSet"}>
          <Row className={"createRuleSetToggle"} onClick={this.toggleCreateRuleSet}>
            <Col className={"createRuleSetToggleTitle"}><Row>Configure a new Rule Set</Row></Col>
            <Col><Row className={"createRuleSetToggleIcon"}>
              <FontAwesomeIcon icon={chevronCircleDown} className={`createRuleSetToggleIconSVG ${this.state.createRuleSetIsOpen ? 'up' : 'down'}`} />
            </Row></Col>
          </Row>
          <Collapse isOpen={this.state.createRuleSetIsOpen}>
            <Form inline={"true"} onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col xs={12} sm={4}>
                  <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>Rule Set</InputGroupAddon>
                    <Field name={"ruleSet"} component={"select"} className={"form-control"}>
                      <option />
                      {this.ruleSetOptions(availableRuleSetKeys)}
                    </Field>
                  </InputGroup>
                </Col>
                <Col xs={12} sm={4}>
                  <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>Name</InputGroupAddon>
                    <Field name={"name"} component={"input"} type={"text"} className={"form-control"} />
                  </InputGroup>
                </Col>
                <Col xs={12} sm={4}>
                  <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>Cover Image URL</InputGroupAddon>
                    <Field name={"url"} component={"input"} type={"text"} className={"form-control"} />
                  </InputGroup>
                </Col>
              </Row>
              <Col>
                <Row className={"submit"}>
                  <Button type={"submit"} disabled={pristine || submitting} onSubmit={() => {return false}}>
                    Submit
                  </Button>
                </Row>
              </Col>
            </Form>
          </Collapse>          
        </Col>
  }

  render() {
    document.title = `Create a new Rule Set`;
    return (
      <Container className={"manageRuleSets"}>
        {this.newRuleSetForm(this.props)}
      </Container>
    )
  }
}

ManageRuleSets.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  availableRuleSetKeys: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    availableRuleSetKeys: state.ruleSetsStore.ruleSets || []
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: createRuleSetInfo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'createRuleSet'})(ManageRuleSets))