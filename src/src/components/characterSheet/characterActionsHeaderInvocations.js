import {commitMutation} from 'react-relay';
import environment from '../../relay';
import deleteCharacterMutation from '../../graphql/mutations/deleteCharacterMutation';

export const deleteCharacter = (id, history) => {
  console.log(history)
  const variables = {
    id
  }
  commitMutation(environment, {mutation: deleteCharacterMutation, variables,
    onCompleted: (resposne, errors) => history.push('/'),
    onError: error => console.log(error)
  });
}