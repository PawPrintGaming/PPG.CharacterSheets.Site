// Actions
export const FETCH_CHARACTERS_REQUESTED = "ppg-characters/character-select/FETCH_REQUESTED";

// Reducer
const reducer = (state = {isFetching: false, charactersInfo: []}, action) => {
  switch (action.type) {
    case FETCH_CHARACTERS_REQUESTED:
      return {
        ...state,
        isFetching: true,
        errorMessage: null
      }
    default:
      return state;
  }
};
export default reducer;

// Action Creators
export const charactersRequestAction = () => (dispatch) => {
  dispatch({type: FETCH_CHARACTERS_REQUESTED});
  // TODO make graph ql call to server
}