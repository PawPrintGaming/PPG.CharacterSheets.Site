// Actions
export const FETCH_RULESETS_SUCCESS  = 'ppg.charactersheets/ruleSets/FETCH_RULESETS_SUCCESS';

export const CREATE_RULESETINFO_SUCCESS  = 'ppg.charactersheets/ruleSets/CREATE_RULESETINFO_SUCCESS';

// Reducer

export const reducer = (state = {ruleSets:[], ruleSetInfos:[]}, action) => {
  switch(action.type) {
    case FETCH_RULESETS_SUCCESS:
      return {
        ...state,
        ruleSets: action.payload
      };
    case CREATE_RULESETINFO_SUCCESS:
      return {
        ...state,
        ruleSetInfos: [...state.ruleSetInfos, action.payload]
      };
    default:
      return state;
  }
}
export default reducer

// Action Creators
export const ruleSetsFetchSuccessAction = (response) => (dispatch) => {
  dispatch({
    type: FETCH_RULESETS_SUCCESS,
    payload: response.ruleSets
  });
}

export const createRuleSetInfoSuccessAction = (response) => (dispatch) => {
  dispatch({
    type: CREATE_RULESETINFO_SUCCESS,
    payload: response
  });
}