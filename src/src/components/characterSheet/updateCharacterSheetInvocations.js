import {commitMutation} from 'relay-runtime'
import environment from '../../relay';
import updateCharacterPropertyMutation from '../../graphql/mutations/updateCharacterPropertyMutation';
import updateCharacterStatMutation from '../../graphql/mutations/updateCharacterStatMutation';
import updateCharacterMetaDataMutation from '../../graphql/mutations/updateCharacterMetaDataMutation';
import upsertCharacterSkillMutation from '../../graphql/mutations/upsertCharacterSkillMutation';
import {actionTypes} from 'redux-form';

export const updateCharacterProperty = (characterId, key, value) => {
  var variables = {
    id: characterId,
    update: {key: key, value: value}
  };
  commitMutation(environment, {mutation: updateCharacterPropertyMutation, variables,
    onError: error => console.log(error)
  });
}

export const updateCharacterStat = (id, key, value) => {
  var variables = {
    id: id,
    update: {key: key, value: value}
  };
  commitMutation(environment, {mutation: updateCharacterStatMutation, variables,
    onError: error => console.log(error)
  });
}

export const updateCharacterMetaData = (characterId, key, value) => {
  var variables = {
    id: characterId,
    update: {key: key, value: `${value}`}
  };
  commitMutation(environment, {mutation: updateCharacterMetaDataMutation, variables,
    onError: error => console.log(error)
  });
}

export const addCharacterSkill = (formKey, dispatch, characterId) => (formValues) => {
  var variables = {
    id: characterId,
    skill: {name: formValues.skillName, rank: parseInt(formValues.skillRank, 10), metaData: []}
  };
  commitMutation(environment, {mutation: upsertCharacterSkillMutation, variables,
    onError: error => console.log(error)
  });
  dispatch({
    type: actionTypes.RESET,
    meta: {
      form: formKey
    }
  });
}

export const updateCharacterSkill = (characterId, updatedSkill) => {
  console.log(updatedSkill)
  var variables = {
    id: characterId,
    skill: updatedSkill
  };
  commitMutation(environment, {mutation: upsertCharacterSkillMutation, variables,
    onError: error => console.log(error)
  });
}