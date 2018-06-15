import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Card, CardBody, CardImg, CardSubtitle, CardTitle, Col, Collapse, Container, Form, FormGroup, InputGroup, InputGroupAddon, Row} from 'reactstrap';
import InlineTextEditor from '../inlineEditors/textEditors/InlineTextEditor';
import {Field, reduxForm} from 'redux-form'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import toggleCreateIcon from '@fortawesome/fontawesome-free-solid/faChevronCircleDown';
import deleteRuleSetIcon from '@fortawesome/fontawesome-free-regular/faTrashAlt';
import viewCharacterSheetIcon from '@fortawesome/fontawesome-free-solid/faUserAlt';
import createCharacterSheetIcon from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import './ManageRuleSets.css';
import {createRuleSetInfo, deleteRuleSetInfo, editRuleSetInline} from './manageRuleSetsInvocations';
import {filterForRuleSetsToCreate} from './manageRuleSetsUtils';

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
      ? <Col className={"allRuleSetsConfigured"}>
          <Row className={"allRuleSetsConfiguredInner"}>
            <Col className={"allRuleSetsConfiguredTitle"}>
              <Row>
                All avilable Rule Sets have been configured
              </Row>
            </Col>
          </Row>
        </Col>
      : <Col className={"createRuleSet"}>
          <Row className={"createRuleSetToggle"} onClick={this.toggleCreateRuleSet}>
            <Col className={"createRuleSetToggleTitle"}><Row>Configure a new Rule Set</Row></Col>
            <Col><Row className={"createRuleSetToggleIcon"}>
              <FontAwesomeIcon icon={toggleCreateIcon} className={`createRuleSetToggleIconSVG ${this.state.createRuleSetIsOpen ? 'up' : 'down'}`} />
            </Row></Col>
          </Row>
          <Collapse isOpen={this.state.createRuleSetIsOpen}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup row>
                <Col xs={12} sm={6}>
                  <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>Rule Set</InputGroupAddon>
                    <Field name={"ruleSet"} component={"select"} className={"form-control"}>
                      <option />
                      {this.ruleSetOptions(availableRuleSetKeys)}
                    </Field>
                  </InputGroup>
                </Col>
                <Col xs={12} sm={6}>
                  <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>Name</InputGroupAddon>
                    <Field name={"name"} component={"input"} type={"text"} className={"form-control"} />
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs={12}>
                  <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>ImageUrl</InputGroupAddon>
                    <Field name={"url"} component={"input"} type={"text"} className={"form-control"} />
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs={12} sm={6}>
                  <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>Create Path</InputGroupAddon>
                    <Field name={"createPath"} component={"input"} type={"text"} className={"form-control"} />
                  </InputGroup>
                </Col>
                <Col xs={12} sm={6}>
                  <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>Sheet Path</InputGroupAddon>
                    <Field name={"viewPath"} component={"input"} type={"text"} className={"form-control"} />
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>Description</InputGroupAddon>
                    <Field name={"description"} component={"textarea"} className={"form-control"} />
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup row className={"submit"}>
                <Col>
                  <Button type={"submit"} disabled={pristine || submitting} onSubmit={() => {return false}}>
                    Submit
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Collapse>          
        </Col>
  }

  displayExistingRuleSets(props) {
    const {ruleSetInfos, onDeleteRuleSetInfo, onEditRuleSetInfo} = this.props;
    document.title = 'Manage Rule Sets';
    return (
      <Col className={"configuredRuleSets"}>
        <Row>Configured Rule Sets</Row>
        <div className={"configuredRuleSetSeries"}>
          {ruleSetInfos.map(ruleSetInfo => {
            const {id, name, ruleSet, imageUrl, description, createCharacterPath, viewCharacterPath} = ruleSetInfo;
            return (
              <Card key={ruleSet}>
                <CardBody>
                  <Row className={"ruleSetCardActions"}>
                    <FontAwesomeIcon icon={deleteRuleSetIcon} onClick={() => onDeleteRuleSetInfo(id)}/>
                  </Row>
                  <CardImg src={imageUrl} alt={`${name} cover image`} />
                  <CardTitle>{name}</CardTitle>
                  <CardSubtitle>{ruleSet}</CardSubtitle>
                  <CardSubtitle><FontAwesomeIcon icon={createCharacterSheetIcon} />{' '}
                    <InlineTextEditor text={createCharacterPath} param={"text"} change={({text}) => onEditRuleSetInfo(ruleSetInfo, 'createCharacterPath', text)} activeClassName={"editing"} />
                  </CardSubtitle>
                  <CardSubtitle><FontAwesomeIcon icon={viewCharacterSheetIcon} />{' '}
                    <InlineTextEditor text={viewCharacterPath} param={"text"} change={({text}) => onEditRuleSetInfo(ruleSetInfo, 'viewCharacterPath', text)} activeClassName={"editing"} />
                  </CardSubtitle>
                    <InlineTextEditor text={description || 'No description provided'} param={"text"} change={({text}) => onEditRuleSetInfo(ruleSetInfo, 'description', text)} activeClassName={"editing"} />
                </CardBody>
              </Card>
          )})}
        </div>
      </Col>
    );

  }

  render() {
    // document.title = `Create a new Rule Set`;
    return (
      <Container className={"manageRuleSets"}>
        {this.newRuleSetForm(this.props)}
        {this.displayExistingRuleSets(this.props)}
      </Container>
    )
  }
}

ManageRuleSets.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  availableRuleSetKeys: PropTypes.array.isRequired,
  ruleSetInfos: PropTypes.array.isRequired,
  onDeleteRuleSetInfo: PropTypes.func.isRequired,
  onEditRuleSetInfo: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const {ruleSets, ruleSetInfos} = state.ruleSetsStore
  return {
    availableRuleSetKeys: filterForRuleSetsToCreate(ruleSets, ruleSetInfos),
    ruleSetInfos
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: createRuleSetInfo,
    onDeleteRuleSetInfo: deleteRuleSetInfo(dispatch),
    onEditRuleSetInfo: editRuleSetInline(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'createRuleSet'})(ManageRuleSets))