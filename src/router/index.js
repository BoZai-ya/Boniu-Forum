import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/Home.vue')
const About = () => import('../views/About.vue')
const Activity = () => import('../views/Activity.vue')
const Message = () => import('../views/Message.vue')
const Login = () => import('../views/Login.vue')
const Topic = () => import('../views/Topic.vue')
const User = () => import('../views/User.vue')
const Topics = () => import('../views/PostTopic.vue')


Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Home,
  }, 
  {
    path: '/home/:tab',
    component: Home,
  },
  {
    path: '/topic/:topicId',
    name:'Topic',
    component: Topic,
  },
  {
    path: '/user/:loginname',
    name:'user',
    component: User,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/activity',
    name: 'Activity',
    component: Activity,
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/topics',
    name: 'Topics',
    component: Topics,
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router