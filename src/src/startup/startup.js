import {fetchQuery} from 'relay-runtime';
import environment from '../relay';
import query from '../graphql/queries/getRuleSetsQuery';
import {ruleSetsFetchSuccessAction} from '../ducks/ruleSets';

export const startup = (dispatch) => {
  fetchQuery(environment, query)
    .then(data => dispatch(ruleSetsFetchSuccessAction(data)));
}
export default startup