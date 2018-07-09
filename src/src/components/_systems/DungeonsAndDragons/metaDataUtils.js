import * as keys from './metaDataKeys';
import {getKeyFromMetaData} from '../../../metaDataUtils';

export const getClass = (metaData) => {
  return getKeyFromMetaData(keys.CLASS, metaData);
}

export const getLevel = (metaData) => {
  return getKeyFromMetaData(keys.LEVEL, metaData);
}

export const getBackground = (metaData) => {
  return getKeyFromMetaData(keys.BACKGROUND, metaData);
}

export const getRace = (metaData) => {
  return getKeyFromMetaData(keys.RACE, metaData);
}

export const getAligment = (metaData) => {
  return getKeyFromMetaData(keys.ALIGNMENT, metaData);
}

export const getProficiencyBonus = (metaData) => parseInt(getKeyFromMetaData(keys.PROFICIENCYBONUS, metaData, 0), 10)

const skillMetaDataProperties = (data) => data.find(data => data.key === keys.metaData.PROPERTIES)
const propertiesProficiency = (properties) => properties.value.find(prop => prop.key === keys.metaData.PROFICIENCY)
const proficiencyIsProficiency = (proficiency) => proficiency.value.find(prof => prof.key === keys.metaData.ISPROFICIENT)
export const isProficient = (skillMetaData) => {
  if(skillMetaData && skillMetaDataProperties(skillMetaData) && propertiesProficiency(skillMetaDataProperties(skillMetaData)) && proficiencyIsProficiency(propertiesProficiency(skillMetaDataProperties(skillMetaData))))
  {
    return proficiencyIsProficiency(propertiesProficiency(skillMetaDataProperties(skillMetaData))).value === 'true';
  }
  return false
}