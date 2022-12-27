import Vue from 'vue'
import VueRouter, { RouteConfig, NavigationGuard, Route, Location } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import jwt from '@/helpers/jwt.helper'
type NextFn = (to?: string | false | void | Location | (((vm: Vue) => any)) | undefined) => void

const beforeEnter: NavigationGuard<Vue> = (to: Route, from: Route, next: NextFn) => {
  const isAuthenticated = jwt.isAuthenticated();
  const needsAuth = to.meta && to.meta.auth === true;
  if (needsAuth) {
    if (!isAuthenticated) return next('/login');
  } else if (isAuthenticated && (to.name === 'login' || to.name === 'signup')) {
    return next('/users');
  }
  return next();
};

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter,
    meta: { nav: false, auth: false }
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    beforeEnter,
    meta: { nav: false, auth: false }
  },
  {
    path: '/users',
    name: 'users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue'),
    beforeEnter,
    meta: { nav: true, auth: true }
  }
]

const router = new VueRouter({ routes });

export default router
