import React, {Component} from 'react';
import guid from 'node-uuid';
import PropTypes from 'prop-types';
import {Field} from 'redux-form'

export class ExpandingTextAreaField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: guid()
    }
  }

  onKeyUp = () => {
    var textarea = document.getElementById(this.state.id);
    const {value, cols} = textarea;
    
    var linecount = 1;
    value.split('\n').forEach(line => {
      linecount += Math.ceil(line.length/cols)
    });
    textarea.rows = linecount < 2 ? 2 : linecount;
  }

  render() {
    const {name, className, cols} = this.props;
    return (
      <Field id={this.state.id} name={name} component={"textarea"} onKeyUp={this.onKeyUp} className={className} cols={cols || 40}/>
    )
  }
}

ExpandingTextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  cols: PropTypes.number,
  minRows: PropTypes.number.isRequired
}

ExpandingTextAreaField.defaultProps = {
  minRows: 2
}

export default ExpandingTextAreaField