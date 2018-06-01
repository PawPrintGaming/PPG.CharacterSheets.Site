import {fetchQuery} from 'relay-runtime';
import environment from '../../relay';
import createRuleSetMutation from '../../graphql/mutations/createRuleSetInfoMutation';
import {createRuleSetInfoSuccessAction} from '../../ducks/ruleSets'

export const createRuleSetInfo = (values, dispatch) => {
  const variables = {
    info: {
      name: values.name,
      ruleSet: values.ruleSet,
      coverImageUrl: values.url
    }
  }
  fetchQuery(environment, createRuleSetMutation, variables)
    .then(data => dispatch(createRuleSetInfoSuccessAction(data)))
}