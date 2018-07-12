import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Row, Tooltip} from 'reactstrap';
import {characterInitiativeBonus, formatModifier, totalSkillModifier} from '../../statUtils';
import {getKeyFromMetaData} from '../../../../../metaDataUtils';
import * as keys from '../../metaDataKeys';
import PopOverEditor from '../../../../inlineEditors/popOverEditor/PopOverEditor';
import InlineTextEditor from '../../../../inlineEditors/textEditors/InlineTextEditor';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import emptySaveIcon from '@fortawesome/fontawesome-free-regular/faCircle';
import filledSaveIcon from '@fortawesome/fontawesome-free-solid/faCircle';
import addSaveIcon from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import removeSaveIcon from '@fortawesome/fontawesome-free-solid/faMinusCircle';
import {updateCharacterMetaData} from '../../../../characterSheet/updateCharacterSheetInvocations';
import {getProficiencyBonus} from '../../metaDataUtils';

export class CharacterDefences extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltips: {},
      deathSaveHover: {
        successes: 0,
        failures: 0
      }
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

  toggleDeathSaveHover = (key, value) => {
    this.setState({
      deathSaveHover: {
        ...this.state.deathSaveHover,
        [key]: value
      }
    })
  }

  renderDeathSaveMarks = (marksFilled, hoverKey, key, onIncreaseDeathSaveMarks, onDecreaseDeathSaveMarks) => {
    let marks = [];
    for (let i = 1; i <= 3; i++)
    {
      let icon;
      let onClick;
      if(i <= marksFilled) {
        if (this.state.deathSaveHover[hoverKey] > 0 && i >= this.state.deathSaveHover[hoverKey]) {
          icon = removeSaveIcon;
        }
        else {
          icon = filledSaveIcon;
        }
        onClick = onDecreaseDeathSaveMarks;
      }
      else {
        if (i <= this.state.deathSaveHover[hoverKey]) {
          icon = addSaveIcon;
        }
        else {
          icon = emptySaveIcon;
        }
        onClick = onIncreaseDeathSaveMarks;
      }
      marks.push(
        <Col key={i} xs={4} className={"saveMark"}>
          <FontAwesomeIcon className={"saveMark"} icon={icon} onMouseEnter={() => this.toggleDeathSaveHover(hoverKey, i)} onMouseLeave={() => this.toggleDeathSaveHover(hoverKey, 0)} onClick={() => onClick(key, i)}/>
        </Col>
      );
    }
    return <Row>{marks}</Row>
  }

  renderPassivePerception = (stats, skills, proficiencyBonus) => {
    const skill = skills.find(skill => skill.name === keys.skillNames.PERCEPTION);
    const stat = stats.find(stat => stat.key === keys.statNames.WISDOM);
    return (
      <Row className={"mx-0 passivePerceptionBlock"} id={"passivePerception"}>
        <Col xs={4} sm={3} className={"value"}>
          {10 + totalSkillModifier(skill, stat.value, proficiencyBonus)}
        </Col>
        <Col xs={8} sm={9} className={"title"}>
          Passive Wisdom (Per)
        </Col>
        <Tooltip placement={"bottom"} target={"passivePerception"} delay={0} isOpen={this.state.tooltips['passivePerception'] || false} toggle={() => this.toggleTooltip('passivePerception')} className={"skillTooltip"}>
          <Row className={"mx-0"}>{`Take 10: 10`}</Row>
          <Row className={"mx-0"}>{`Perception: ${formatModifier(totalSkillModifier(skill, stat.value, proficiencyBonus))}`}</Row>
      </Tooltip>
      </Row>
    )
  }

  render() {
    const {
      character,
      onUpdateBaseSpeed, onUpdateMaximumHP, onUpdateCurrentHP, onUpdateTemporaryHP,
      onUpdateCurrentNumberOfHitDice, onUpdateMaximumNumberOfHitDice,
      onIncreaseDeathSaveMarks, onDecreaseDeathSaveMarks
    } = this.props;
    const {stats, skills, metaData} = character;
    const proficiencyBonus = getProficiencyBonus(metaData)
    return (
      <div>
        <Row className={"mx-0"}>
          <Col className={"characterDefences"}>
            <Row className={"topRow"}>
              <Col className={"defencePair armourClass"}>
                <Row className={"value"}>#</Row>
                <Row className={"title"}>{"Armour".toUpperCase()}</Row>
                <Row className={"title"}>{"Class".toUpperCase()}</Row>
              </Col>
              <Col className={"defencePair initiative"}>
                <Row className={"value"}>{characterInitiativeBonus(stats)}</Row>
                <Row className={"title"}>{"Initiative".toUpperCase()}</Row>
              </Col>
              <Col id={"speed"} className={"defencePair speed"}>
                <Row className={"value"}>
                  <PopOverEditor id={"speed"} text={getKeyFromMetaData(keys.BASESPEED, metaData)} change={({text}) => onUpdateBaseSpeed(text)} title={"Base Speed"} inputType={"number"} />
                </Row>
                <Row className={"title"}>{"Speed".toUpperCase()}</Row>
              </Col>
              <Tooltip placement={"bottom"} target={"speed"} delay={0} isOpen={this.state.tooltips['speed'] || false} toggle={() => this.toggleTooltip('speed')}>
                <Row className={"mx-0"}>{`Base Speed: ${getKeyFromMetaData(keys.BASESPEED, metaData)}`}</Row>
              </Tooltip>
            </Row>
            <Row>
              <Col className={"defenceBlock top"}>
                <Row className={"header"}>
                  <Col xs={8} className={"title"}>Hit Point Maximum:</Col>
                  <Col xs={3} className={"value"}>
                    <InlineTextEditor text={getKeyFromMetaData(keys.hp.MAXHP, metaData)} change={({text}) => onUpdateMaximumHP(text)} param={keys.hp.MAXHP} inputType={"number"} />
                  </Col>
                </Row>
                <Row className={"value"}>
                  <Col>
                    <InlineTextEditor text={getKeyFromMetaData(keys.hp.CURRENTHP, metaData)} change={({text}) => onUpdateCurrentHP(text)} param={keys.hp.CURRENTHP} inputType={"number"} />
                  </Col>
                </Row>
                <Row className={"title"}>{"Current Hit Points".toUpperCase()}</Row>
              </Col>
            </Row>
            <Row>
              <Col className={"defenceBlock bottom"}>
                <Row className={"value"}>
                  <Col>
                    <InlineTextEditor text={getKeyFromMetaData(keys.hp.TEMPORARYHP, metaData, 0)} change={({text}) => onUpdateTemporaryHP(text)} param={keys.hp.TEMPORARYHP} inputType={"number"} />
                  </Col>
                </Row>
                <Row className={"title"}>{"Temporary Hit Points".toUpperCase()}</Row>
              </Col>
            </Row>
            <Row>
              <Col className={"defenceBlock left"}>
                <Row className={"header"}>
                  <Col xs={5} className={"title"}>Total:</Col>
                  <Col xs={6} className={"value currentNumberHitDice"}>
                    <InlineTextEditor text={getKeyFromMetaData(keys.hp.CURRENTNUMBEROFHITDICE, metaData, 0)} change={({text}) => onUpdateCurrentNumberOfHitDice(text)} param={keys.hp.CURRENTNUMBEROFHITDICE}/>
                    /
                    <InlineTextEditor text={getKeyFromMetaData(keys.hp.MAXNUMBEROFHITDICE, metaData, 0)} change={({text}) => onUpdateMaximumNumberOfHitDice(text)} param={keys.hp.MAXNUMBEROFHITDICE}/>
                  </Col>
                </Row>
                <Row className={"value"}>d{getKeyFromMetaData(keys.hp.HITDICEVALUE, metaData)}</Row>
                <Row className={"title"}>{"Hit Dice".toUpperCase()}</Row>
              </Col>
              <Col className={"defenceBlock right"}>
                <Row className={"saveTitleRow"}>
                  <Col xs={6} className={"saveTitle"}>Successes</Col>
                  <Col xs={6} className={"saveMarks"}>{this.renderDeathSaveMarks(getKeyFromMetaData(keys.deathSaves.SUCCESSES, metaData, 0), 'successes', keys.deathSaves.SUCCESSES, onIncreaseDeathSaveMarks, onDecreaseDeathSaveMarks)}</Col>
                </Row>
                <Row className={"saveTitleRow"}>
                  <Col xs={6} className={"saveTitle"}>Failures</Col>
                  <Col xs={6} className={"saveMarks"}>{this.renderDeathSaveMarks(getKeyFromMetaData(keys.deathSaves.FAILURES, metaData, 0), 'failures', keys.deathSaves.FAILURES, onIncreaseDeathSaveMarks, onDecreaseDeathSaveMarks)}</Col>
                </Row>
                <Row className={"title"}>{"Death Saves".toUpperCase()}</Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.renderPassivePerception(stats, skills, proficiencyBonus)}
          </Col>
        </Row>
      </div>
    )
  }
}

CharacterDefences.propTypes = {
  character: PropTypes.object.isRequired,
  onUpdateBaseSpeed: PropTypes.func.isRequired,
  onUpdateMaximumHP: PropTypes.func.isRequired,
  onUpdateCurrentHP: PropTypes.func.isRequired,
  onUpdateTemporaryHP: PropTypes.func.isRequired,
  onUpdateCurrentNumberOfHitDice: PropTypes.func.isRequired,
  onUpdateMaximumNumberOfHitDice: PropTypes.func.isRequired,
  onIncreaseDeathSaveMarks: PropTypes.func.isRequired,
  onDecreaseDeathSaveMarks: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  const {character} = props;
  return {
    onUpdateBaseSpeed: (value) => updateCharacterMetaData(character.id, keys.BASESPEED, value),
    onUpdateMaximumHP: (value) => updateCharacterMetaData(character.id, keys.hp.MAXHP, value),
    onUpdateCurrentHP: (value) => updateCharacterMetaData(character.id, keys.hp.CURRENTHP, value),
    onUpdateTemporaryHP: (value) => updateCharacterMetaData(character.id, keys.hp.TEMPORARYHP, value),
    onUpdateCurrentNumberOfHitDice: (value) => updateCharacterMetaData(character.id, keys.hp.CURRENTNUMBEROFHITDICE, value),
    onUpdateMaximumNumberOfHitDice: (value) => updateCharacterMetaData(character.id, keys.hp.MAXNUMBEROFHITDICE, value),
    onIncreaseDeathSaveMarks: (key, value) => updateCharacterMetaData(character.id, key, value),
    onDecreaseDeathSaveMarks: (key, value) => updateCharacterMetaData(character.id, key, value-1)
  }
}

export default connect(mapStateToProps)(CharacterDefences)