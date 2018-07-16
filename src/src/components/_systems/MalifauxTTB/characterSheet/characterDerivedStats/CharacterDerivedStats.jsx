import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Row, Tooltip} from 'reactstrap';
import {BlockHeader} from '../blockHeader/BlockHeader';
import InlineTextEditor from '../../../../inlineEditors/textEditors/InlineTextEditor';
import * as keys from '../../metaDataKeys';
import {potentialSkillRank, calculateDefense, calculateWillpower, calculateWalk, calculateCharge, calculateInitiative, caluclateMaxWounds} from '../../statAndSkillUtils';
import {getKeyFromMetaData} from '../../../../../metaDataUtils';
import {updateCharacterMetaData} from '../../../../characterSheet/updateCharacterSheetInvocations';

export class CharacterDerivedStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltips: {}
    }
  }

  toggleTooltip = (key) => {
    this.setState({
      tooltips: {
        ...this.state.tooltips,
        [key]: !this.state.tooltips[key] || false
      }
    })
  }

  buildStatDataPair = (name, value, isSubItem = false) => (
    <Row className={`statDataPair${isSubItem? ' subItem' : ''}`}>
      <Col xs={8} className={"name"}>{name}</Col>
      <Col xs={4} id={name} className={"value"}>{value}</Col>
    </Row>      
  )
  buildStatDataPairWithEditor = (name, value, change, isSubItem = false) => (
    <Row className={`statDataPair${isSubItem? ' subItem' : ''}`}>
      <Col xs={8} className={"name"}>{name}</Col>
      <Col xs={4} id={name} className={"value"}>
        <InlineTextEditor text={value} title={name} param={name} change={({text}) => change(text)} />
      </Col>
    </Row>      
  )
  buildStatDataPairForWounds = (name, stats, skills, metaData, onUpdateCurrentWounds) => (
    <Row className={`statDataPair`}>
      <Col xs={8} className={"name"}>{name}</Col>
      <Col xs={4} id={name} className={"value"}>
        <Row className={"mx-0"}>
          <Col className={"px-0"} xs={5}>
            {<InlineTextEditor text={getKeyFromMetaData(keys.CURRENTWOUNDS, metaData, 0)} title={'Wounds'} param={'currentWounds'} change={({text}) => onUpdateCurrentWounds(text)} />}
          </Col>
          <Col className={"px-0"} xs={1}>/</Col>
          <Col className={"px-0"} xs={5}>{caluclateMaxWounds(stats, skills)}</Col>
        </Row>
      </Col>
    </Row>
  )

  calculateDefenseTooltipText = (stats, skills) => {
    let speed = stats.find(stat => stat.key === keys.statNames.SPEED).value;
    let evadeRank = potentialSkillRank(skills, keys.skillNames.EVADE);
    let evade = evadeRank + speed;
    return speed >= evade
      ? `Speed: ${speed}`
      : `Evade: ${evade}`;
  }

  calculateWillpowerTooltipText = (stats, skills) => {
    let tenacity = stats.find(stat => stat.key === keys.statNames.TENACITY).value;
    let centeringRank = potentialSkillRank(skills, keys.skillNames.CENTERING);
    let centering = centeringRank + tenacity;
    return tenacity >= centering
      ? `Tenacity: ${tenacity}`
      : `Centering: ${centering}`;
  }

  calculateWalkTooltipText = (stats) => {
    let speed = stats.find(stat => stat.key === keys.statNames.SPEED).value;
    return `Speed Modifier: ${Math.ceil(speed/2)}`
  }

  calculateChargeTooltipText = (stats) => {
    let speed = stats.find(stat => stat.key === keys.statNames.SPEED).value;
    return `Speed Modifier: ${speed}`
  }
  calculateChargeTooltipWalkOverride = (stats) => {
    let speed = stats.find(stat => stat.key === keys.statNames.SPEED).value;
    let charge = speed + 4;
    let walk = calculateWalk(stats);
    return charge >= walk
      ? null
      : <Row className={"mx-0"}>{`Walk Override: ${walk}`}</Row>;
  }

  calculateMaxWoundsTooltipTextToughness = (stats, skills) => {
    let resilience = stats.find(stat => stat.key === keys.statNames.RESILIENECE).value;
    let toughnessRank = potentialSkillRank(skills, keys.skillNames.TOUGHNESS);
    let toughness = toughnessRank + resilience;
    return resilience >= toughness
      ? `Resilience: ${resilience}`
      : `Toughness: ${toughness}`;
  }
  calculateMaxWoundsTooltipResilence = (stats) => {
    let resilience = stats.find(stat => stat.key === keys.statNames.RESILIENECE).value;
    return resilience > 0
      ? <Row className={"mx-0"}>{`Resilience Bonus: ${Math.ceil(resilience/2)}`}</Row>
      : null;
  }

  calculateInitiativeTooltipTextSpeed = (stats) => {
    let speed = stats.find(stat => stat.key === keys.statNames.SPEED).value;
    return `Speed: ${speed}`;
  }
  calculateInitiativeTooltipTextNotice = (stats, skills) => {
    let cunning = stats.find(stat => stat.key === keys.statNames.CUNNING).value;
    let noticeRank = potentialSkillRank(skills, keys.skillNames.NOTICE);
    let notice = noticeRank + cunning;
    return `Notice: ${notice}`;
  }

  render() {
    const {character, onUpdateCurrentWounds, onUpdateHeight} = this.props;
    const {stats, skills, metaData} = character
    return (
      <Col className={"characterDerivedStats panel leftPanel"} xs={12}>
        <BlockHeader header={"Derived Aspects"} />
        <Row className={"characterStatsTable"}>
          <Col>
            {this.buildStatDataPair('Defense', calculateDefense(stats, skills))}
              <Tooltip placement={"bottom"} target={"Defense"} delay={0} isOpen={this.state.tooltips['defense'] || false} toggle={() => this.toggleTooltip('defense')}>
                <Row className={"mx-0"}>{`Base Defense: 2`}</Row>
                <Row className={"mx-0"}>{this.calculateDefenseTooltipText(stats, skills)}</Row>
              </Tooltip>
            {this.buildStatDataPair('Armour', '#', true)}
            {this.buildStatDataPair('Willpower', calculateWillpower(stats, skills))}
              <Tooltip placement={"bottom"} target={"Willpower"} delay={0} isOpen={this.state.tooltips['willpower'] || false} toggle={() => this.toggleTooltip('willpower')}>
                <Row className={"mx-0"}>{`Base Willpower: 2`}</Row>
                <Row className={"mx-0"}>{this.calculateWillpowerTooltipText(stats, skills)}</Row>
              </Tooltip>
            {this.buildStatDataPairForWounds('Wounds', stats, skills, metaData, onUpdateCurrentWounds)}
              <Tooltip placement={"bottom"} target={"Wounds"} delay={0} isOpen={this.state.tooltips['wounds'] || false} toggle={() => this.toggleTooltip('wounds')}>
                <Row>
                  <Col>
                    <Row className={"mx-0"}>Max Wounds:</Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Row className={"ml-3 mr-0"}>{`Base Wounds: 4`}</Row>
                    <Row className={"ml-3 mr-0"}>{this.calculateMaxWoundsTooltipTextToughness(stats, skills)}</Row>
                    {this.calculateMaxWoundsTooltipResilence(stats)}
                  </Col>
                </Row>
              </Tooltip>
          </Col>
          <Col>
            {this.buildStatDataPair('Walk', calculateWalk(stats))}
              <Tooltip placement={"bottom"} target={"Walk"} delay={0} isOpen={this.state.tooltips['walk'] || false} toggle={() => this.toggleTooltip('walk')}>
                  <Row className={"mx-0"}>{`Base Walk: 4`}</Row>
                  <Row className={"mx-0"}>{this.calculateWalkTooltipText(stats)}</Row>
                </Tooltip>
            {this.buildStatDataPair('Charge', calculateCharge(stats), true)}
              <Tooltip placement={"bottom"} target={"Charge"} delay={0} isOpen={this.state.tooltips['charge'] || false} toggle={() => this.toggleTooltip('charge')}>
                  <Row className={"mx-0"}>{`Base Charge: 4`}</Row>
                  <Row className={"mx-0"}>{this.calculateChargeTooltipText(stats)}</Row>
                  {this.calculateChargeTooltipWalkOverride(stats)}
                </Tooltip>
            {this.buildStatDataPair('Initiative', calculateInitiative(stats, skills))}
              <Tooltip placement={"bottom"} target={"Initiative"} delay={0} isOpen={this.state.tooltips['initiative'] || false} toggle={() => this.toggleTooltip('initiative')}>
                <Row className={"mx-0"}>{this.calculateInitiativeTooltipTextSpeed(stats)}</Row>
                <Row className={"mx-0"}>{this.calculateInitiativeTooltipTextNotice(stats, skills)}</Row>
              </Tooltip>
            {this.buildStatDataPairWithEditor('Height', getKeyFromMetaData(keys.HEIGHT, metaData, 0), onUpdateHeight)}
          </Col>
        </Row>
      </Col>
    )
  }
}

CharacterDerivedStats.propTypes = {
  character: PropTypes.object.isRequired,
  onUpdateCurrentWounds: PropTypes.func.isRequired,
  onUpdateHeight: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  const {character} = props;
  return {
    onUpdateCurrentWounds: (value) => updateCharacterMetaData(character.id, keys.CURRENTWOUNDS, value),
    onUpdateHeight: (value) => updateCharacterMetaData(character.id, keys.HEIGHT, value)
  }
}

export default connect(mapStateToProps)(CharacterDerivedStats)