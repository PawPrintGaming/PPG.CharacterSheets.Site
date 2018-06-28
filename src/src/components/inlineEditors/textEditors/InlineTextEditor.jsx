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
    const {text, param, change, inputType, showEditable, editingElement} = this.props;
    return (
      <div className={"inline editable"}>
        <InlineEdit text={text || '-'} change={change} activeClassName={`${param} editing`} className={`${param} editable${showEditable ? ' showEditable' : ''}`} staticElement={"div"} inputType={inputType} editingElement={editingElement}/>
        {this.renderEditableIcon(showEditable, param)}
      </div>
    )
  }
}

InlineTextEditor.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.func.isRequired,
  showEditable: PropTypes.bool.isRequired,
  inputType: PropTypes.string,
  param: PropTypes.string.isRequired,
  editingElement: PropTypes.string
}

InlineTextEditor.defaultProps = {
  showEditable: true
}

const mapStateToProps = (state) => {
  return {
    showEditable: state.userOptions.showEditable
  }
}

export default connect(mapStateToProps)(InlineTextEditor)