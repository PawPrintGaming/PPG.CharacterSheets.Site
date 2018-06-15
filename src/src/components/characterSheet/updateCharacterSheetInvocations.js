import {commitMutation} from 'relay-runtime'
import environment from '../../relay';
import updateCharacterPropertyMutation from '../../graphql/mutations/updateCharacterPropertyMutation';
import updateCharacterStatMutation from '../../graphql/mutations/updateCharacterStatMutation';
import updateCharacterMetaDataMutation from '../../graphql/mutations/updateCharacterMetaDataMutation';

export const updateCharacterProperty = (id, key, value) => {
  var variables = {
    id: id,
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

export const updateCharacterMetaData = (id, key, value) => {
  var variables = {
    id: id,
    update: {key: key, value: `${value}`}
  };
  commitMutation(environment, {mutation: updateCharacterMetaDataMutation, variables,
    onError: error => console.log(error)
  });
}