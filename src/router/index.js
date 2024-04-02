import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import authors from '../statics/authors.json';
import contexts from '../statics/contexts.json'

const authorRoutes = contexts.map(context => {
  const children = authors.filter((author) => {
    if(author.context == context.id){
      return true
    }
  }).map((author) => {
    return {
      path: `/${author.id}`,
      name: author.id,
      component: () => import(`../authors/${context.id}/${author.id}.md`),
    }
  })
  return {
    path: `/${context.id}`,
    name: context.id,
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
    component: () => import('../../README.md')
  }, ...authorRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior () {
    window.scrollTo(0,0);
  },
  routes
})

export default router
