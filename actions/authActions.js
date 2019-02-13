'use strict';

import axios from 'axios';

// load API routes
import {
  emailPasswordLoginRoute,
  emailPasswordRegisterRoute,
  emailPasswordSignoutRoute,
  facebookLoginRoute,
  facebookSignoutRoute
} from '../constants/apiRoutes';

// load action types
import {
  REGISTER_EMAIL_PASSWORD,
  LOGIN_EMAIL_PASSWORD,
  SIGNOUT_EMAIL_PASSWORD,
  LOGIN_FACEBOOK,
  SIGNOUT_FACEBOOK
} from '../constants/actionTypes/auth';

/* EMAIL/PASSWORD AUTHENTICATION ACTIONS */

// register new users using email and password
export const registerEmailPasswordUser = (
  name,
  email,
  password
) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(emailPasswordRegisterRoute, { name, email, password })
      .then(serverResponse => {
        // extract user info from response object
        const { _id, name, email, accessToken } = serverResponse.data;

        // store user info in redux state
        dispatch({
          type: REGISTER_EMAIL_PASSWORD,
          payload: { _id, name, email, accessToken, type: 'email/password' }
        });

        resolve();
      })
      .catch(error => {
        reject(error.response.data.message);
      });
  });
};

// login users registered using email address
export const loginEmailPasswordUser = (email, password) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(emailPasswordLoginRoute, { email, password })
      .then(serverResponse => {
        // extract user info from response object
        const { _id, name, email, accessToken } = serverResponse.data;

        // store user info in redux state
        dispatch({
          type: LOGIN_EMAIL_PASSWORD,
          payload: { _id, name, email, accessToken, type: 'email/password' }
        });

        resolve();
      })
      .catch(error => {
        reject(error.response.data.message);
      });
  });
};

// signout users registered using email address
export const signoutEmailPasswordUser = (id, accessToken) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(emailPasswordSignoutRoute, { _id: id, accessToken })
      .then(() => {
        // wipe out all user info from redux store
        dispatch({ type: SIGNOUT_EMAIL_PASSWORD });
        resolve();
      })
      .catch(error => {
        reject(error.response.data.message);
      });
  });
};

/* FACEBOOK AUTHENTICATION ACTIONS */

// login users using facebook account
export const loginFacebookUser = accessToken => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(facebookLoginRoute, { accessToken })
      .then(serverResponse => {
        // extract user info from response object
        const { _id, name, email, accessToken, user_id } = serverResponse.data;

        dispatch({
          type: LOGIN_FACEBOOK,
          payload: { _id, name, email, accessToken, user_id, type: 'facebook' }
        });

        resolve();
      })
      .catch(error => {
        reject(error.response.data.message);
      });
  });
};

// signout users registered using facebook account
export const signoutFacebookUser = (id, user_id, accessToken) => dispatch => {
  console.log('signoutFacebookUser action called');

  return new Promise((resolve, reject) => {
    axios
      .post(facebookSignoutRoute, { _id: id, user_id, accessToken })
      .then(() => {
        dispatch({ type: SIGNOUT_FACEBOOK });
        resolve();
      })
      .catch(error => {
        reject(error.response.data.message);
      });
  });
};
