import React, {Component} from 'react';
import PropTypes from 'prop-types';
import guid from 'node-uuid'

export class InlineEdit extends Component {
constructor(props) {
  super(props);

  this.state = {
    editing: props.editing || false,
    text: this.props.text,
    previousKey: "",
    guid: guid()
  }
}

  startEditing = () => {
    this.setState({editing: true, text: this.props.text})
  }

  commitEditing = () => {
    this.setState({editing: false, text: this.state.text})
    let newProp = {};
    newProp.text = this.state.text;
    this.props.change(newProp);
  }

  finishEditing = () => {
    if (this.props.text !== this.state.text) {
      this.commitEditing();
    }
    else {
      this.cancelEditing();
    }
  }

  cancelEditing = () => {
    this.setState({editing: false, text: this.props.text})
  }

  onKeyDown = (event) => {
    if (event.keyCode === 13 && this.state.previousKey !== 16) {
      this.finishEditing();
    }
    else if (event.keyCode === 27) {
      this.cancelEditing();
    }
    this.setState({
      previousKey: event.keyCode
    });
  }

  onKeyUp = () => {
    if(this.props.editingElement === 'textarea')
    {
      var textarea = document.getElementById(this.state.guid);
      const {value, cols} = textarea;
      
      textarea.rows = this.getRowsForTextArea(value, cols);
    }
  }

  getRowsForTextArea = (text, cols) => {
    var linecount = 0;
    text.split('\n').forEach(line => {
      linecount += Math.ceil(line.length/cols)
    });
    return linecount;
  }

  textChanged = (event) => {
    this.setState({text: event.target.value.trim()});
  };

  render() {
    if (this.props.isDisabled) {
      const Element = this.props.staticElement;
      return (
        <Element id={this.state.guid} className={this.props.className} name={this.props.name}>
          {this.state.text || this.props.placeholder}
        </Element>
      )
    }
    else if (!this.state.editing) {
      const Element = this.props.staticElement;
      return (
        <Element id={this.state.guid} className={this.props.className} onClick={this.startEditing} name={this.props.name}>
          {this.state.text || this.props.placeholder}
        </Element>
      )
    }
    else {
      const Element = this.props.editingElement;
      return (
        <Element
          id={this.state.guid}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
          cols={60}
          rows={this.props.editingElement === 'textarea' ? this.getRowsForTextArea(this.state.text, 60) : 0}
          onBlur={this.finishEditing}
          className={this.props.activeClassName}
          placeholder={this.props.placeholder}
          defaultValue={this.state.text}
          onChange={this.textChanged}
          ref={"input"}
          type={this.props.inputType}
          name={this.props.name}
        />
      )
    }
  }
}

InlineEdit.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.func.isRequired,

  isDisabled: PropTypes.bool,
  staticElement: PropTypes.string,
  editingElement: PropTypes.string,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  placeholder: PropTypes.string,
  inputType: PropTypes.string,
  editing: PropTypes.bool,
  name: PropTypes.string
}

InlineEdit.defaultProps = {
  isDisabled: false,
  staticElement: "div",
  editingElement: "input",
  inputType: "text"
}

export default InlineEdit