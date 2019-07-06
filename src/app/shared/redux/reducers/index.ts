import menuReducer from './menu.reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  menu: menuReducer
});
