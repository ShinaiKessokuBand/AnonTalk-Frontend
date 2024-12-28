import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '../components/Home.vue'
import Chat from '../components/Chat.vue'
import Settings from '../components/Settings.vue'
import Square from '../components/Square.vue'
import PostDetail from '../components/PostDetail.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home },
  { path: '/chat', component: Chat },
  { path: '/settings', component: Settings },
  { path: '/square', component: Square },
  { path: '/post/:id', name: 'PostDetail', component: PostDetail, props: true }
]

const router = new VueRouter({
  routes
})

export default router