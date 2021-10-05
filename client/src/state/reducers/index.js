import { combineReducers } from 'redux';
import columnsReducer from './columns-reducer';
import cardsReducer from './cards-reducer';

const reducers = combineReducers({
  columns: columnsReducer,
  cards: cardsReducer,
});

export default reducers;
