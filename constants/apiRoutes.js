'use strict';

/* EMAIL/PASSWORD AUTHENTICATION ROUTES */
// register new user
export const emailPasswordRegisterRoute =
  'https://lawyer-forum-server.herokuapp.com/auth/email_password/register';
// login registered user
export const emailPasswordLoginRoute =
  'https://lawyer-forum-server.herokuapp.com/auth/email_password/login';
// sign out registered user
export const emailPasswordSignoutRoute =
  'https://lawyer-forum-server.herokuapp.com/auth/email_password/signout';

/* FACEBOOK AUTHENTICATION ROUTES*/
// login facebook user
export const facebookLoginRoute =
  'https://lawyer-forum-server.herokuapp.com/auth/facebook/login';
// signout facebook user
export const facebookSignoutRoute =
  'https://lawyer-forum-server.herokuapp.com/auth/facebook/signout';
