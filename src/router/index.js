import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import AuthorPage from '@/views/AuthorView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => PageNotFound
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../../README.md')
  }, 
  {
    path: '/author/:id',
    name: 'author',
    component: () => AuthorPage
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
