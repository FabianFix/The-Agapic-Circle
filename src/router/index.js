import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Authors from '../statics/authors.json';

const authorRoutes = Object.keys(Authors).map(section => {
  const children = Authors[section].map(child => ({
    path: child.id,
    name: child.id,
    component: () => import(`../authors/${section}/${child.id}.md`)
  }))
  return {
    path: `/${section}`,
    name: section,
    component: () => import('../views/AuthorView.vue'),
    children
  }
})

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }, ...authorRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
