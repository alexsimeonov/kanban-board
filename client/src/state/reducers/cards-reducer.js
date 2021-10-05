/* eslint-disable no-case-declarations */
import ActionTypes from '../action-creators/action-types';

const reducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.GET_CARDS:
      return action.payload;
    case ActionTypes.GET_CARD_BY_ID:
      return action.payload;
    case ActionTypes.EDIT_CARD:
      const newState = [...state];
      const cardToEdit = newState.find((card) => card.id === action.payload.id);
      const index = newState.indexOf(cardToEdit);
      newState.splice(index, 1, action.payload);
      return newState;
    case ActionTypes.DELETE_CARD:
      return [...action.payload];
    default:
      return state;
  }
};

export default reducer;
