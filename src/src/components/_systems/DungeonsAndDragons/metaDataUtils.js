import * as keys from './metaDataKeys';
import {getKeyFromMetaData} from '../../../metaDataUtils';

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