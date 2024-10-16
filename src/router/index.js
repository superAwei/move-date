import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import UserProfile from '../views/UserProfile.vue'
import MovieBrowser from '../views/MovieBrowser.vue'
import UserMatching from '../views/UserMatching.vue'
import Chat from '../views/Chat.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/movies',
    name: 'MovieBrowser',
    component: MovieBrowser
  },
  {
    path: '/matches',
    name: 'UserMatching',
    component: UserMatching
  },
  {
    path: '/chat/:id',
    name: 'Chat',
    component: Chat
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
