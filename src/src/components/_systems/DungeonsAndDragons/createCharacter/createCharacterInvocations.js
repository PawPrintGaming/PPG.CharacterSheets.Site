import {commitMutation} from 'react-relay';
import environment from '../../../../relay';
import createCharacterMutation from '../../../../graphql/mutations/createCharacterMutation';
import {actionTypes} from 'redux-form';
import * as keys from '../metaDataKeys';

const mapToStats = (statsFromForm) => {
  let statsForMutation = [];
  for(var stat in statsFromForm) {
    statsForMutation.push({key: stat, value: statsFromForm[stat]})
  }
  return statsForMutation;
}

const buildMetaData = (values) => {
  let metaData = [];
  metaData.push({key: keys.ALIGNMENT, value: values.alignment});
  metaData.push({key: keys.BACKGROUND, value: values.background});
  metaData.push({key: keys.RACE, value: values.race});
  metaData.push({key: keys.PROFICIENCYBONUS, value: values.proficiencyBonus})
  return metaData;
}

const buildSkillMetaData = (skill) => {
  let metaData = [];
  metaData.push({key: keys.metaData.PROPERTIES, value: [{key: keys.metaData.PROFICIENCY, value: [{key: keys.metaData.ISPROFICIENT, value: `${skill.proficiency}` || 'false'}]}]});
  return metaData;
}

const buildSkills = (skillsFromForm) => {
  let skillsForMutation = [];
  for(let index in skillsFromForm) {
    const skill = skillsFromForm[index];
    if(skill) {
      skillsForMutation.push({name: index, rank: 0, metaData: buildSkillMetaData(skill)})
    }
  }
  return skillsForMutation;
}

export const createCharacter = (history) => (values, dispatch) => {
  const variables = {
    character: {
      characterName: values.characterName,
      ruleSet: 'DUNGEONSAND_DRAGONS',
      stats: mapToStats(values.stats),
      metaData: buildMetaData(values),
      skills: buildSkills(values.skills)
    }
  }
  commitMutation(environment, {mutation: createCharacterMutation, variables,
    onCompleted: (response, errors) => history.push(`/character/${response.createCharacter.id}`),
    onError: error => console.log(error)
  });
  dispatch({
    type: actionTypes.RESET,
    meta: {
      form: 'createCharacterDnD'
    }
  })
}