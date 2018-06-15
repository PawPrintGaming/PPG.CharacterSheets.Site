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

export const createCharacter = (history) => (values, dispatch) => {
  const variables = {
    character: {
      characterName: values.characterName,
      ruleSet: 'MALIFAUX_TTB',
      stats: mapToStats(values.stats),
      metaData: buildMetaData(values)
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