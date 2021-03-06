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
  metaData.push({key: keys.CURRENTPURSUIT, value: values.startingPursuit})
  metaData.push({key: keys.STATION, value: values.station})
  metaData.push({key: keys.HEIGHT, value: values.height})
  metaData.push({key: keys.EXPERIENCE, value: '0'})
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

const buildWallets = (wallets) => {
  let walletsForMutation = [];
  walletsForMutation.push({key: keys.wallets.GUILDSCRIP, value: wallets[keys.wallets.GUILDSCRIP]})
  return walletsForMutation;
}

export const createCharacter = (history) => (values, dispatch) => {
  const variables = {
    character: {
      characterName: values.characterName,
      ruleSet: 'MALIFAUX_TTB',
      stats: mapToStats(values.stats),
      metaData: buildMetaData(values),
      skills: buildSkills(values.skills),
      wallets: buildWallets(values.wallets)
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