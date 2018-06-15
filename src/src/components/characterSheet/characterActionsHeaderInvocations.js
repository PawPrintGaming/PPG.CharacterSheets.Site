import {fetchQuery, commitMutation} from 'react-relay';
import environment from '../../relay';
import deleteCharacterMutation from '../../graphql/mutations/deleteCharacterMutation';
import characterSelectQuery from '../../graphql/queries/characterSelectQuery';

export const getCharacter = (id) => {
  const variables = {
    id
  }
  return fetchQuery(environment, characterSelectQuery, variables)
}

export const deleteCharacter = (id, history) => {
  const variables = {
    id
  }
  commitMutation(environment, {mutation: deleteCharacterMutation, variables,
    onCompleted: (resposne, errors) => history.push('/'),
    onError: error => console.log(error)
  });
}