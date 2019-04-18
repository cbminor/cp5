import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Public from './views/Public.vue'
import MyPage from './views/MyPage.vue'
import Scrapbook from './views/Scrapbook.vue'
import EditPage from './views/EditPage.vue'
import EditScrapbook from './views/EditScrapbook.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/public',
      name: 'public',
      component: Public
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage
    },
    {
      path: '/scrapbook',
      name: 'scrapbook',
      component: Scrapbook
    },
    {
      path: '/editpage',
      name: 'editpage',
      component: EditPage
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditScrapbook
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})