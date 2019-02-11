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
      state.userInfo = { ...action.payload };
      return { ...state };
    case LOGIN_EMAIL_PASSWORD:
      // store payload into redux store
      state.userInfo = { ...action.payload };
      return { ...state };
    case SIGNOUT_EMAIL_PASSWORD:
      // remove all user info from redux state
      state.userInfo = {};
      return { ...state };
    default:
      return { ...state };
  }
};
