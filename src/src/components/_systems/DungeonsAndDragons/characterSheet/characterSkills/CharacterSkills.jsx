import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Row, Tooltip} from 'reactstrap';
import {formatModifier, statNameAbbreviation, totalSkillModifier, calculateModifierForStat} from "../../statUtils";
import {despace} from '../../../../../metaDataUtils';
import * as d3 from 'd3';
import {isProficient, getProficiencyBonus} from '../../metaDataUtils';
import * as keys from '../../metaDataKeys';
import InlineTextEditor from '../../../../inlineEditors/textEditors/InlineTextEditor';
import {updateCharacterMetaData, updateCharacterSkill} from '../../../../characterSheet/updateCharacterSheetInvocations';
import { toggleProficiencyTransform } from '../updateCharacterTransforms';

export class CharacterSkills extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tooltips: {}
    }
  }

  toggleToolTip = (key) => {
    this.setState({
      tooltips: {
        ...this.state.tooltips,
        [key]: !this.state.tooltips[key] || false
      }
    })
  }

  skillModifierId = (skillName) => `${despace(skillName)}-modifier`

  skillProficiencyId = (skillName) => `${despace(skillName)}-proficiency`;

  renderSkillProficiency = (skill, skillInfo) => {
    var graphic = d3.select(`#${this.skillProficiencyId(skillInfo.name)}`)

    graphic.selectAll('.proficiency').remove();
    
    const height = parseInt(graphic.style('height'), 10);
    const width = parseInt(graphic.style('width'), 10);

    graphic.append('circle')
      .attr('cx', width/2)
      .attr('cy', height*0.65)
      .attr('r',  height*0.2)
      .attr('class', `proficiency ${(skill ? isProficient(skill.metaData) : false) ? 'proficient' : 'unproficient'}`)
  }
  
  renderSavingThrow = (savingThrowInfo, savingThrow, stat, proficiencyBonus, onProficienyToggle) => (
    <Row key={savingThrowInfo.name} className={"mx-0"} id={this.skillModifierId(savingThrowInfo.name)}>
      <Col xs={1} className={"px-0 proficiencyCol editable"}><svg ref={node => this.node = node} id={`${this.skillProficiencyId(savingThrowInfo.name)}`} className={'proficiencyGraphic'} onClick={() => onProficienyToggle(savingThrow)}/></Col>
      <Col xs={1} className={"modifier"}>{formatModifier(totalSkillModifier(savingThrow, stat.value, proficiencyBonus))}</Col>
      <Tooltip placement={"bottom"} target={this.skillModifierId(savingThrowInfo.name)} delay={0} isOpen={this.state.tooltips[this.skillModifierId(savingThrowInfo.name)] || false} toggle={() => this.toggleToolTip(this.skillModifierId(savingThrowInfo.name))} className={"skillTooltip"}>
        <Row className={"mx-0"}>
          {`${stat.key}: ${formatModifier(calculateModifierForStat(stat.value))}`}
        </Row>
        {
          isProficient(savingThrow ? savingThrow.metaData : undefined)
          ? <Row className={"mx-0"}>
              {`Proficiency Bonus: ${formatModifier(proficiencyBonus)}`}
            </Row>
          : null
        }
      </Tooltip>
      <Col cs={10} className={"name"}>{savingThrowInfo.name}</Col>
    </Row>
  )

  renderSkill = (skillInfo, skill, stat, proficiencyBonus, onProficienyToggle) => (
    <Row key={skillInfo.name} className={"mx-0"} id={this.skillModifierId(skillInfo.name)}>
      <Col xs={1} className={"px-0 proficiencyCol editable"}><svg ref={node => this.node = node} id={`${this.skillProficiencyId(skillInfo.name)}`} className={'proficiencyGraphic'} onClick={() => onProficienyToggle(skill)}/></Col>
      <Col xs={1} className={"modifier"}>{formatModifier(totalSkillModifier(skill, stat.value, proficiencyBonus))}</Col>
      <Tooltip placement={"bottom"} target={this.skillModifierId(skillInfo.name)} delay={0} isOpen={this.state.tooltips[this.skillModifierId(skillInfo.name)] || false} toggle={() => this.toggleToolTip(this.skillModifierId(skillInfo.name))} className={"skillTooltip"}>
        <Row className={"mx-0"}>
          {`${stat.key}: ${formatModifier(calculateModifierForStat(stat.value))}`}
        </Row>
        {
          isProficient(skill.metaData)
          ? <Row className={"mx-0"}>
              {`Proficiency Bonus: ${formatModifier(proficiencyBonus)}`}
            </Row>
          : null
        }
      </Tooltip>
      <Col cs={10} className={"name"}>{`${skillInfo.name} (${statNameAbbreviation(stat.key || ' - ')})`}</Col>
    </Row>
  )

  render() {
    const {onProficienyBonusUpdate, onProficienyToggle} = this.props
    const {skills, stats, metaData} = this.props.character
    const skillInfos = this.props.skillInfoSets.find(skillInfoSet => skillInfoSet.key === keys.skillSets.DEFAULT).value;
    const savingThrowInfos = this.props.skillInfoSets.find(skillInfoSet => skillInfoSet.key === keys.skillSets.SAVINGTHROWS).value;
    const proficiencyBonus = getProficiencyBonus(metaData)
    return (
      <Col sm={12} md={3} className={"characterBonusesAndSkills"}>
        <Row>
          <Col xs={5} sm={12} className={"characterBonuses"}>
          <Row className={"inspirationBlock"}>
              <Col xs={4} sm={3} className={"value"}>
                <InlineTextEditor isDisabled={true} text={'-'} change={(() => false)} param={"inspiration"} />
              </Col>
              <Col xs={8} sm={9} className={"title"}>Inspiration</Col>
            </Row>
            <Row className={"proficiencyBonusBlock"}>
              <Col xs={4} sm={3} className={"value"}>
                <InlineTextEditor text={proficiencyBonus} change={({text}) => onProficienyBonusUpdate(text)} inputType={"number"} param={"proficiencyBonus"} />
              </Col>
              <Col xs={8} sm={9} className={"title"}>
                Proficiency Bonus
              </Col>
            </Row>
            <Row className={"savingThrowsBlock"}>
              {
                savingThrowInfos.map(savingThrowInfo => {
                  const savingThrow = skills.find(savingThrow => savingThrow.name === savingThrowInfo.name);
                  const stat = stats.find(stat => savingThrowInfo.statKeys.some(statKey => statKey === stat.key));
                  return this.renderSavingThrow(savingThrowInfo, savingThrow, stat, proficiencyBonus, onProficienyToggle);
                })
              }
            </Row>
          </Col>
          <Col xs={7} sm={12} className={"characterSkills"}>
            {
              skillInfos.map(skillInfo => {
                const skill = skills.find(skill => skill.name === skillInfo.name);
                const stat = stats.find(stat => skillInfo.statKeys.some(statKey => statKey === stat.key));
                return this.renderSkill(skillInfo, skill, stat, proficiencyBonus, onProficienyToggle);
              })
            }
          </Col>
        </Row>
      </Col>
    )
  }

  renderProficiencies = (props) => {
    const {character, skillInfoSets} = props
    const {skills} = character
    const skillInfos = skillInfoSets.find(skillInfoSet => skillInfoSet.key === keys.skillSets.DEFAULT).value;
    skillInfos.map(skillInfo => {
      const skill = skills.find(skill => skill.name === skillInfo.name)
      return this.renderSkillProficiency(skill, skillInfo);
    })
    const savingThrowInfos = skillInfoSets.find(skillInfoSet => skillInfoSet.key === keys.skillSets.SAVINGTHROWS).value;
    savingThrowInfos.map(savingThrowInfo => {
      const savingThrow = skills.find(skill => skill.name === savingThrowInfo.name)
      return this.renderSkillProficiency(savingThrow, savingThrowInfo);
    })
  }

  componentDidMount() {
    this.renderProficiencies(this.props);
  }

  componentDidUpdate() {
    this.renderProficiencies(this.props);
  }
}
CharacterSkills.propTypes = {
  character: PropTypes.object.isRequired,
  skillInfoSets: PropTypes.array.isRequired,
  onProficienyBonusUpdate: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  const {character} = props
  return {
    onProficienyBonusUpdate: (value) => updateCharacterMetaData(character.id, keys.PROFICIENCYBONUS, value),
    onProficienyToggle: (skill) => updateCharacterSkill(character.id, toggleProficiencyTransform(skill))
  }
}

export default connect(mapStateToProps)(CharacterSkills)