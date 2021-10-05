import { combineReducers } from 'redux';
import columnsReducer from './columns-reducer';

const reducers = combineReducers({
  columns: columnsReducer,
});

export default reducers;
