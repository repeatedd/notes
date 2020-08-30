import { combineReducers } from 'redux';
import noteReducer from './noteReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  note: noteReducer,
  error:errorReducer,
  auth:authReducer,
});