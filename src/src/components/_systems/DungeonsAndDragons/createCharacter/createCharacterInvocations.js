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
  metaData.push({key: 'Alignment', value: values.alignment});
  metaData.push({key: 'Background', value: values.background});
  metaData.push({key: 'Race', value: values.race});
  return metaData;
}

export const createCharacter = (history) => (values, dispatch) => {
  console.log('Values', values)
  const variables = {
    character: {
      characterName: values.characterName,
      ruleSet: 'DUNGEONSAND_DRAGONS',
      stats: mapToStats(values.stats),
      metaData: buildMetaData(values)
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