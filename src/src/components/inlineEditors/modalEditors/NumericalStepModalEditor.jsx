import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import modalIcon from '@fortawesome/fontawesome-free-solid/faExternalLinkSquareAlt';
import stepDownIcon from '@fortawesome/fontawesome-free-solid/faCaretSquareLeft';
import stepUpIcon from '@fortawesome/fontawesome-free-solid/faCaretSquareRight';
import {Alert, Button, Col, Modal, ModalHeader, ModalBody, ModalFooter, Row} from 'reactstrap';
import '../InLineEditors.css'

export class NumericalStepModalEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      error: false,
      errorText: null
    }
  }
  
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  enableError = (message) => {
    this.setState({
      error: true,
      errorText: message
    })
  }
  disableError = () => {
    this.setState({
      error: false,
      errorText: null
    })
  }

  validateMin = (min, value) => (min !== undefined && value >= min)
  validateMax = (max, value) => (max !== undefined && value <= max)
  isMin = (min, value) => value <= min
  isMax = (max, value) => value >= max

  validateMinMax = (change, value, title) => {
    const {min, max} = this.props;
    if (this.validateMin(min, value) && this.validateMax(max, value)) {
      this.disableError();
    }
    if (!this.validateMin(min, value)) {
      this.enableError(`Cannot assign a value less than ${min} for ${title}`);
    }
    if (!this.validateMax(max, value)) {
      this.enableError(`Cannot assign a value greater than ${max} for ${title}`);
    }
    if ((this.validateMin(min, value) && this.validateMax(max, value)) || (min === undefined && max === undefined))
    {
      change(value);
    }
  }
  
  renderEditableIcon = (showEditable, param) => {
    return showEditable
      ? <FontAwesomeIcon icon={modalIcon} className={"popoverIcon"} onClick={() => document.getElementsByClassName(param)[0].click()}/>
      : null
  }

  render() {
    const {showEditable, id, text, value, title, change, min, max, className} = this.props;
    return (
          <div id={id} onClick={this.toggleModal} className={`numericalStepModalEditor editable${showEditable ? ' showEditable' : ''}${className ? ` ${className}` : ''}`}>
            {text}{this.renderEditableIcon(showEditable, id)}
            <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal} onClosed={this.disableError} className={"numericalStepModalEditor"}>
              <ModalHeader>Edit: {title}</ModalHeader>
              <ModalBody>
                <Row className={"numericalStepModalEditorBody"}>
                  <Col xs={5} className={"stepModalIcon down"}><FontAwesomeIcon icon={stepDownIcon} className={`${this.isMin(min, value) ? 'disabled' : ''}`} onClick={this.isMin(min, value) ? () => {} : () => this.validateMinMax(value => change(value), value-1, title)}/></Col>
                  <Col xs={2}>{value}</Col>
                  <Col xs={5} className={"stepModalIcon up"}><FontAwesomeIcon icon={stepUpIcon} className={`${this.isMax(max, value) ? 'disabled' : ''}`} onClick={this.isMax(max, value) ? () => {} : () => this.validateMinMax(value => change(value), value+1, title)}/></Col>
                </Row>
                {this.state.error ? <Alert color={"danger"}>{this.state.errorText}</Alert> : null}
              </ModalBody>
              <ModalFooter>
                <Button color={"primary"} onClick={this.toggleModal}>Done</Button>
              </ModalFooter>
            </Modal>
          </div>
    )
  }
}

NumericalStepModalEditor.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array]).isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  showEditable: PropTypes.bool.isRequired,
  change: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  className: PropTypes.string
}

NumericalStepModalEditor.defaultProps = {
  showEditable: true
}

const mapStateToProps = (state) => {
  return {
    showEditable: state.userOptions.showEditable
  }
}

export default connect(mapStateToProps)(NumericalStepModalEditor)

