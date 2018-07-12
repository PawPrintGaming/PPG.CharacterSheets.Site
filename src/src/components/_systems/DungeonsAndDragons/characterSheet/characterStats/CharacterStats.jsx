import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';
import {calculateModifierForStat, formatModifier} from '../../statUtils'
import PopoverEditor from '../../../../inlineEditors/popOverEditor/PopOverEditor';
import {updateCharacterStat} from '../../../../characterSheet/updateCharacterSheetInvocations';

export class CharactersStats extends Component {
  buildStatDataPair = (id, name, value, title) => (
    <Col key={name} className={"statDataPair"} xs={5} sm={4} md={12}>
      <Row className={"name"}>{name.toUpperCase()}</Row>
      <Row className={"value"}><PopoverEditor id={name} text={value} title={title} change={({text}) => updateCharacterStat(id, name, text)} inputType={"number"}/></Row>
      <Row><Col col={4} className={"modifier"}>{formatModifier(calculateModifierForStat(value))}</Col></Row>
    </Col>
  )

  render() {
    const {id, stats} = this.props.character
    return (
        <Row className={"characterStats"}>
          {stats.map(stat => {
            return this.buildStatDataPair(id, stat.key, stat.value, stat.key)
          })}
        </Row>
    )
  }
}

CharactersStats.propTypes = {
  character: PropTypes.object.isRequired
}

export default CharactersStats