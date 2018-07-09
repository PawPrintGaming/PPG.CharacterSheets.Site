import {isProficient} from "./metaDataUtils";

export const calculateModifierForStat = (statValue) => Math.floor(statValue/2)-5;

export const formatModifier = (modifierValue) => `${modifierValue > 0? '+' : ''}${modifierValue}`;

export const statNameAbbreviation = (statName) => statName.slice(0, 3);

export const totalSkillModifier = (skill, statValue, proficiencyBonus) => {
  const statModifier = calculateModifierForStat(statValue);
  const proficiencyModifier = skill ? isProficient(skill.metaData) ? proficiencyBonus : 0 : 0;
  return statModifier + proficiencyModifier;
};