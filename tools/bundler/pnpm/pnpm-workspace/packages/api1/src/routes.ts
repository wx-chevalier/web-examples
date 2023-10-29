import Router = require('koa-router');
export const router = new Router();
// import other routes

import * as Auth from './actions/auth';
import * as Users from './actions/users';


router
  // auth
  .post('/auth/login', Auth.login)
  .post('/auth/signup', Auth.signup)
  // users
  .get('/api/users', Users.find)
  .get('/api/users/:id', Users.findOne)
  .patch('/api/users/:id', Users.update)
  .del('/api/users/:id', Users.del);
