import {commitMutation} from 'relay-runtime'
import environment from '../../relay';
import updateCharacterPropertyMutation from '../../graphql/mutations/updateCharacterPropertyMutation';

export const updateCharacterProperty = (id, key, value) => {
  var variables = {
    id: id,
    update: {key: key, value: value}
  };
  commitMutation(environment, {mutation: updateCharacterPropertyMutation, variables,
    onError: error => console.log(error)
  });
}