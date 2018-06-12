import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';
import {calculateModifierForStat} from '../../statUtils'

export class CharactersStats extends Component {
  buildStatDataPair = (name, value) => (
    <Col key={name} className={"statDataPair"} xs={3} sm={12}>
      <Row className={"name"}>{name.toUpperCase()}</Row>
      <Row className={"value"}>{value}</Row>
      <Row><Col col="4" className={"modifier"}>{calculateModifierForStat(value)}</Col></Row>
    </Col>
  )

  render() {
    const {stats} = this.props
    return (
      <Col sm={2}>
        <Row className={"characterStats DnD"}>
          {stats.map(stat => {
            return this.buildStatDataPair(stat.key, stat.value)
          })}
        </Row>
      </Col>
    )
  }
}

CharactersStats.propTypes = {
  stats: PropTypes.array.isRequired
}

export default CharactersStats