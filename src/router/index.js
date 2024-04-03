import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/PageNotFound.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../../README.md')
  }, 
  {
    path: '/author/:id',
    name: 'author',
    component: () => import('@/views/AuthorView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior () {
    window.scrollTo(0,0);
  },
  routes
})

export default router
