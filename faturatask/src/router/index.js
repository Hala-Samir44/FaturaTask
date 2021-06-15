import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../views/WelcomePage.vue'
import Home from '../views/Home.vue'
import GifView from '../views/GifView.vue'

const routes = [
  {
    path: '/',
    name: 'WelcomePage',
    component: WelcomePage
  },
  {
    path: '/WelcomePage',
    name: 'WelcomePage2',
    component: WelcomePage
  },
  {
    path: '/GifView/:id',
    name: 'GifView',
    component: GifView
  },
  {
    path: '/:pgname', 
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
