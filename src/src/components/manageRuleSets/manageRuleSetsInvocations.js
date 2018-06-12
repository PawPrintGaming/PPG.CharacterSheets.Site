import {commitMutation} from 'react-relay';
import environment from '../../relay';
import createRuleSetInfoMutation from '../../graphql/mutations/createRuleSetInfoMutation';
import deleteRuleSetInfoMutation from '../../graphql/mutations/deleteRuleSetInfoMutation';
import updateRuleSetInfoMutation from '../../graphql/mutations/updateRuleSetInfoMutation';
import {createRuleSetInfoSuccessAction, deleteRuleSetInfoSuccessAction, updateRuleSetInfoSuccessAction} from '../../ducks/ruleSets'
import {actionTypes} from 'redux-form';

export const createRuleSetInfo = (values, dispatch) => {
  const variables = {
    ruleSetInfo: {
      name: values.name,
      ruleSet: values.ruleSet,
      imageUrl: values.url,
      description: values.description,
      characterSheetKey: values.characterSheet,
      createCharacterPath: values.createPath,
      viewCharacterPath: values.viewPath
    }
  };
  commitMutation(environment, {mutation: createRuleSetInfoMutation, variables,
    onCompleted: (response, errors) => dispatch(createRuleSetInfoSuccessAction(response.createRuleSetInfo)),
    onError: error => console.log(error)
  });
  dispatch({
    type: actionTypes.RESET,
    meta: {
      form: 'createRuleSet'
    }
  })
}

export const deleteRuleSetInfo = (dispatch) => (id) => {
  const variables = {
    id: id
  };
  commitMutation(environment, {mutation: deleteRuleSetInfoMutation, variables,
    onCompleted: (response, errors) => dispatch(deleteRuleSetInfoSuccessAction(id)),
    onError: error => console.log(error)
  })
}

export const editRuleSetInline = (dispatch) => (ruleSetInfo, field, newValue) => {
  if(ruleSetInfo[field] !== newValue)
  {
    const variables = {
      ruleSetInfo: {
        ...ruleSetInfo,
        [field]: newValue
      }
    }
    commitMutation(environment, {mutation: updateRuleSetInfoMutation, variables,
      onCompleted: (response, errors) => dispatch(updateRuleSetInfoSuccessAction(response.updateRuleSetInfo)),
      onError: error => console.log(error)
    })
  }
}