/* eslint-disable no-case-declarations */
import ActionTypes from '../action-creators/action-types';

const reducer = (state = {
  cards: [],
  filterValue: '',
}, action) => {
  switch (action.type) {
    case ActionTypes.GET_CARDS:
      return { ...state, cards: action.payload };
    case ActionTypes.GET_CARD_BY_ID:
      return { ...state, cards: action.payload };
    case ActionTypes.ADD_CARD:
      return { ...state, cards: [...state.cards, action.payload] };
    case ActionTypes.EDIT_CARD:
      const newCards = [...state.cards];
      const cardToEdit = newCards.find((card) => card.id === action.payload.id);
      const index = newCards.indexOf(cardToEdit);
      newCards.splice(index, 1, action.payload);
      return { ...state, cards: newCards };
    case ActionTypes.DELETE_CARD:
      return { ...state, cards: [...action.payload] };
    case ActionTypes.FILTER_CARDS:
      return { cards: state.cards, filterValue: action.payload };
    default:
      return state;
  }
};

export default reducer;
