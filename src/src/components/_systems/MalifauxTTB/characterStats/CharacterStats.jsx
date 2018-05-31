import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StatDataPair from './StatDataPair';
import {Col} from 'reactstrap';
import './CharacterStats.css';

export class CharacterStats extends Component {
  render() {
    const {stats} = this.props;
    return (
      <Col className={"characterStats Malifaux"} sm="6">
        {stats.map(stat => {
          return <StatDataPair key={stat.key} name={stat.key} value={stat.value} />
        })}
      </Col>
    )
  }
}

CharacterStats.proptypes = {
  stats: PropTypes.array.isRequired
}

export default CharacterStats