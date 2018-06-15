import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class InlineEdit extends Component {
constructor(props) {
  super(props);

  this.state = {
    editing: props.editing || false,
    text: this.props.text
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
    if (event.keyCode === 13) {
      this.finishEditing();
    }
    else if (event.keyCode === 27) {
      this.cancelEditing();
    }
  }

  textChanged = (event) => {
    this.setState({text: event.target.value.trim()});
  };

  render() {
    if (this.props.isDisabled) {
      const Element = this.props.staticElement;
      return (
        <Element className={this.props.className}>
          {this.state.text || this.props.placeholder}
        </Element>
      )
    }
    else if (!this.state.editing) {
      const Element = this.props.staticElement;
      return (
        <Element className={this.props.className} onClick={this.startEditing}>
          {this.state.text || this.props.placeholder}
        </Element>
      )
    }
    else {
      const Element = this.props.editingElement;
      return (
        <Element
          onKeyDown={this.onKeyDown}
          onBlur={this.finishEditing}
          className={this.props.activeClassName}
          placeholder={this.props.placeholder}
          defaultValue={this.state.text}
          onChange={this.textChanged}
          ref={"input"}
          type={this.props.inputType}
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
  editing: PropTypes.bool
}

InlineEdit.defaultProps = {
  isDisabled: false,
  staticElement: "div",
  editingElement: "input",
  inputType: "text"
}

export default InlineEdit