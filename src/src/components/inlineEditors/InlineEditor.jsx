import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InlineEdit from 'react-edit-inplace';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import editableIcon from '@fortawesome/fontawesome-free-solid/faEdit';
import './InlineEditor.css'

export class InlineEditor extends Component {
  render() {
    const {value, param, change} = this.props;
    return (
      <div className={"editable"}> {/* TO DO NEXT Found update calls for parts of the character */}
        <InlineEdit text={value || '-'} paramName={"text"} change={change} activeClassName={"editing"} className={`${param} editable`} staticElement={"div"}/>
        <FontAwesomeIcon icon={editableIcon} className={"editableIcon"} onClick={() => document.getElementsByClassName(param)[0].click()}/>
      </div>
    )
  }
}

InlineEditor.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  param: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired
}

export default InlineEditor