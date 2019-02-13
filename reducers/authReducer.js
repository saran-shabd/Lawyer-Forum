const initialState = {
  userInfo: {}
};

// load auth action types
import {
  REGISTER_EMAIL_PASSWORD,
  LOGIN_EMAIL_PASSWORD,
  SIGNOUT_EMAIL_PASSWORD,
  LOGIN_FACEBOOK,
  SIGNOUT_FACEBOOK
} from '../constants/actionTypes/auth';

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_EMAIL_PASSWORD:
      // store payload into redux state
      return { ...state, userInfo: action.payload };
    case LOGIN_EMAIL_PASSWORD:
      // store payload into redux store
      return { ...state, userInfo: action.payload };
    case SIGNOUT_EMAIL_PASSWORD:
      // remove all user info from redux state
      return { ...state, userInfo: initialState.userInfo };
    case LOGIN_FACEBOOK:
      // store payload into redux state
      return { ...state, userInfo: action.payload };
    case SIGNOUT_FACEBOOK:
      // remove all user info from redux state
      return { ...state, userInfo: initialState.userInfo };
    default:
      return state;
  }
};
