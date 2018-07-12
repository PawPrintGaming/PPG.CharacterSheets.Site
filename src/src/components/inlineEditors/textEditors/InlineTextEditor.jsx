import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import InlineEdit from '../inlineEdit/InlineEdit';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import editableIcon from '@fortawesome/fontawesome-free-solid/faEdit';
import '../InLineEditors.css'

export class InlineTextEditor extends Component {
  renderEditableIcon = (showEditable, param) => {
    return showEditable
    ? <FontAwesomeIcon icon={editableIcon} className={"editableIcon"} onClick={() => document.getElementsByClassName(param)[0].click()}/>
    : null
  }
  
  render() {
    const {text, param, change, inputType, showEditable, editingElement, isDisabled, defaultValue, prefix, formatter} = this.props;
    return (
      <div className={`inline editable inlineTextEditor`}>
        <InlineEdit
          text={text || defaultValue}
          change={change}
          activeClassName={`${param} editing`}
          className={`inlineTextEditor ${param} editable${showEditable ? ' showEditable' : ''}`}
          staticElement={"div"}
          inputType={inputType}
          editingElement={editingElement}
          isDisabled={isDisabled}
          prefix={prefix}
          formatter={formatter}
        />
        {this.renderEditableIcon(showEditable, param)}
      </div>
    )
  }
}

InlineTextEditor.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.func.isRequired,
  showEditable: PropTypes.bool.isRequired,
  inputType: PropTypes.string,
  param: PropTypes.string.isRequired,
  editingElement: PropTypes.string,
  isDisabled: PropTypes.bool.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  formatter: PropTypes.func
}

InlineTextEditor.defaultProps = {
  showEditable: true,
  isDisabled: false,
  prefix: ''
}

const mapStateToProps = (state, props) => {
  return {
    showEditable: state.userOptions.showEditable,
    defaultValue: props.inputType === 'number' ? '0' : '-'
  }
}

export default connect(mapStateToProps)(InlineTextEditor)