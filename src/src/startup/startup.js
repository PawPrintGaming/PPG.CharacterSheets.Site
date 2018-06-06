import {fetchQuery} from 'react-relay';
import environment from '../relay';
import getRuleSetsQuery from '../graphql/queries/getRuleSetsQuery';
import getRulesSetInfosQuery from '../graphql/queries/getRuleSetInfosQuery';
import {ruleSetsFetchSuccessAction, ruleSetInfosFetchSuccessAction} from '../ducks/ruleSets';

export const startup = (dispatch) => {
  fetchQuery(environment, getRuleSetsQuery)
    .then(data => dispatch(ruleSetsFetchSuccessAction(data)));
  fetchQuery(environment, getRulesSetInfosQuery)
    .then(data => dispatch(ruleSetInfosFetchSuccessAction(data)));
}
export default startup