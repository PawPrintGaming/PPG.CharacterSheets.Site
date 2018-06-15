import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Switch.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export class Switch extends Component {
  renderIcon = ({on, onIcon, offIcon}) => {
    if(on && onIcon)
    {
      return <FontAwesomeIcon icon={onIcon} className={"toggleSubIcon"}/>
    }
    if(!on && offIcon)
    {
      return <FontAwesomeIcon icon={offIcon} className={"toggleSubIcon"}/>
    }
    return null;
  }

  render() {
    const {on, onClick} = this.props;
    return (
      <div className={"switchContainer"} onClick={onClick}>
        <div className={`switchBar${on ? ' on' : ' off'}`}></div>
        <div className={`switchToggle${on ? ' on' : ' off'}`}>
          {this.renderIcon(this.props)}
        </div>
      </div>
    )
  }
} 

Switch.propTypes = {
  on: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onIcon: PropTypes.object,
  offIcon: PropTypes.object
}

export default Switch;