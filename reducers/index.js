import { combineReducers } from 'redux';

// import all reducers
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer
});
