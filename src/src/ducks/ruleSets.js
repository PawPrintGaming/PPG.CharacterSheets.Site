// Actions
export const FETCH_RULESETS_SUCCESS = 'ppg.charactersheets/ruleSets/FETCH_RULESETS_SUCCESS';

export const FETCH_RULESETINFOS_SUCCESS = 'ppg.charactersheets/ruleSets/FETCH_RULESETINFOS_SUCCESS';
export const CREATE_RULESETINFO_SUCCESS = 'ppg.charactersheets/ruleSets/CREATE_RULESETINFO_SUCCESS';
export const DELETE_RULESETINFO_SUCCESS = 'ppg.charactersheets/ruleSets/DELETE_RULESETINFO_SUCCESS';
export const UPDATE_RULESETINFO_SUCCESS = 'ppg.charactersheets/ruleSets/UPDATE_RULESETINFO_SUCCESS';

// Helper Functions
const deleteRuleSetInfo = (ruleSetInfos, id) => {
  const indexToDelete = ruleSetInfos.findIndex(ruleSetInfo => ruleSetInfo.id === id);
  if(indexToDelete !== -1) {
    var updatedRuleSetInfos = ruleSetInfos.slice();
    updatedRuleSetInfos.splice(indexToDelete, 1);
    return updatedRuleSetInfos;
  }
  return ruleSetInfos;
}

const updateRuleSetInfo = (ruleSetInfos, toUpdate) => {
  const indexToUpdate = ruleSetInfos.findIndex(ruleSetInfo => ruleSetInfo.id === toUpdate.id);
  if(indexToUpdate !== -1) {
    var updateRuleSetInfos = ruleSetInfos.slice();
    updateRuleSetInfos[indexToUpdate] = toUpdate;
    return updateRuleSetInfos;
  }
  return ruleSetInfos;
}

// Reducer
export const reducer = (state = {ruleSets:[], ruleSetInfos:[]}, action) => {
  switch(action.type) {
    case FETCH_RULESETS_SUCCESS:
      return {
        ...state,
        ruleSets: action.payload
      };
    case FETCH_RULESETINFOS_SUCCESS:
      return {
        ...state,
        ruleSetInfos: action.payload
      };
    case CREATE_RULESETINFO_SUCCESS:
      return {
        ...state,
        ruleSetInfos: [...state.ruleSetInfos, action.payload]
      };
    case DELETE_RULESETINFO_SUCCESS:
      return {
        ...state,
        ruleSetInfos: deleteRuleSetInfo(state.ruleSetInfos, action.payload)
      };
    case UPDATE_RULESETINFO_SUCCESS:
      return {
        ...state,
        ruleSetInfos: updateRuleSetInfo(state.ruleSetInfos, action.payload)
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

export const ruleSetInfosFetchSuccessAction = (response) => (dispatch) => {
  dispatch({
    type: FETCH_RULESETINFOS_SUCCESS,
    payload: response.ruleSetInfos
  });
}
export const createRuleSetInfoSuccessAction = (response) => (dispatch) => {
  dispatch({
    type: CREATE_RULESETINFO_SUCCESS,
    payload: response
  });
}
export const deleteRuleSetInfoSuccessAction = (response) => (dispatch) => {
  dispatch({
    type: DELETE_RULESETINFO_SUCCESS,
    payload: response
  });
}
export const updateRuleSetInfoSuccessAction = (response) => (dispatch) => {
  dispatch({
    type: UPDATE_RULESETINFO_SUCCESS,
    payload: response
  });
}