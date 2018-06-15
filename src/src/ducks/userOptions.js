// Actions
export const SWITCH_SHOWEDITABLE = 'ppg.charactersheets/userOptions/SWITCH_SHOWEDITABLE';

// Reducers
export const reducer = (state = {showEditable: false}, action) => {
  switch (action.type) {
    case SWITCH_SHOWEDITABLE:
      return {
        ...state,
        showEditable: !state.showEditable
      }
    default:
      return state;
  }
}
export default reducer

// Action Creator
export const switchShowEditableAction = () => (dispatch) => {
  dispatch({
    type: SWITCH_SHOWEDITABLE
  });
}
