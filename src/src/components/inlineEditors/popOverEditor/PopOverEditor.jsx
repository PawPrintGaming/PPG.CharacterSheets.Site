import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Popover, PopoverBody, PopoverHeader} from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import popoverIcon from '@fortawesome/fontawesome-free-solid/faExternalLinkAlt';
import InlineEdit from '../inlineEdit/InlineEdit';
import '../InLineEditors.css'

export class PopOverEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      popOverOpen: false
    }
  }

  toggle = () => {
    this.setState({
      ...this.state,
      popOverOpen: !this.state.popOverOpen
    })
  }

  renderEditableIcon = (showEditable, param) => {
    return showEditable
    ? <FontAwesomeIcon icon={popoverIcon} className={"popoverIcon"} onClick={() => document.getElementsByClassName(param)[0].click()}/>
    : null
  }

  render() {
    const {id, placement, text, inputType, inputSize, change, title, showEditable} = this.props;
    return (
      <div className={`popoverEdit editable${showEditable ? ' showEditable' : ''}`}>
        <div id={id} onClick={this.toggle}>{text}{this.renderEditableIcon(showEditable, id)}</div>
        <Popover placement={placement} isOpen={this.state.popOverOpen} target={id} toggle={this.toggle} className={`${id} popoverEditor`}>
          <PopoverHeader>Edit: {title}</PopoverHeader>
          <PopoverBody><InlineEdit parentForceUpdate={this.state.parentForceUpdate} inputType={inputType} text={text} editing={true} change={text => {change(text); this.toggle();}} activeClassName={"editing"} inputSize={inputSize}/></PopoverBody>
        </Popover>
      </div>
    )
  }
}

PopOverEdit.propTypes = {
  id: PropTypes.string.isRequired,
  placement: Popover.propTypes.placement,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  inputType: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  showEditable: PropTypes.bool.isRequired
}

PopOverEdit.defaultProps = {
  placement: "bottom",
  inputType: "text",
  showEditable: true
}

const mapStateToProps = (state) => {
  return {
    showEditable: state.userOptions.showEditable
  }
}

export default connect(mapStateToProps)(PopOverEdit)