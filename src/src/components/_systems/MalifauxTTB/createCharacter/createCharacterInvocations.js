import {commitMutation} from 'react-relay';
import environment from '../../../../relay';
import createCharacterMutation from '../../../../graphql/mutations/createCharacterMutation';
import {actionTypes} from 'redux-form';

const mapToStats = (statsFromForm) => {
  let statsForMutation = [];
  for(var stat in statsFromForm) {
    statsForMutation.push({key: stat, value: statsFromForm[stat]})
  }
  return statsForMutation;
}

const buildMetaData = (values) => {
  let metaData = [];
  metaData.push({key: "CurrentPursuit", value: values.startingPursuit})
  metaData.push({key: "Station", value: values.station})
  return metaData;
}

const buildSkillMetaData = (skill) => {
  let metaData = [];
  if (skill.triggers) {
    let triggers = skill.triggers.map(trigger => ({key: trigger.name, value: [{key: "suit", value: trigger.suit}, {key: "description", value: trigger.description}]}));
    metaData.push({key: "triggers", value: triggers})
  }
  return metaData;
}

const buildSkills = (skillsFromForm) => {
  let skillsForMutation = [];
  for(let index in skillsFromForm) {
    const skill = skillsFromForm[index];
    if(skill) {
      skillsForMutation.push({name: skill.name, rank: skill.rank, metaData: buildSkillMetaData(skill)})
    }
  }
  return skillsForMutation;
}

export const createCharacter = (history) => (values, dispatch) => {
  const variables = {
    character: {
      characterName: values.characterName,
      ruleSet: 'MALIFAUX_TTB',
      stats: mapToStats(values.stats),
      metaData: buildMetaData(values),
      skills: buildSkills(values.skills)
    }
  };
  commitMutation(environment, {mutation: createCharacterMutation, variables,
    onCompleted: (response, errors) => history.push(`/character/${response.createCharacter.id}`),
    onError: error => console.log(error)
  });
  dispatch({
    type: actionTypes.RESET,
    meta: {
      form: 'createCharacterMalifaux'
    }
  })
}