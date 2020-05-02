import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Login from '../views/Login.vue'
import users from '@/store/modules/users';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      auth: true
    }
  },
  {
    path: "/about",
    name: "About",
    meta: {
      auth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      auth: false
    },
    component: () => import('@/views/Register.vue')
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  console.log('bronimy')
  const accessToken = users.accessToken
  console.log(accessToken)
  if (to.meta.auth && !accessToken) {
    next('/login')
  } else {
    next()
  }
})

export default router;
