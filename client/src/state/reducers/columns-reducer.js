/* eslint-disable no-case-declarations */
import ActionTypes from '../action-creators/action-types';

const reducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.GET_COLUMNS:
      return action.payload;
    case ActionTypes.ADD_COLUMN:
      return [...state, action.payload];
    case ActionTypes.EDIT_COLUMN:
      const newState = [...state];
      const column = newState.find((col) => col.id === action.payload.id);
      const index = newState.indexOf(column);
      newState.splice(index, 1, action.payload);
      return newState;
    case ActionTypes.DELETE_COLUMN:
      return [...action.payload];
    default:
      return state;
  }
};

export default reducer;
