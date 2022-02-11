import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserHome from '../views/UserHome.vue'
import BookList from '../components/user/BookList.vue'
import Recommend from '../components/user/Recommend.vue'
import UserBorrow from '../components/user/UserBorrow.vue'
import UserInfo from '../components/user/UserInfo.vue'
import UserPassword from '../components/user/UserPassword.vue'
import AdminHome from '../views/AdminHome.vue'
import AdminPassword from '../components/admin/AdminPassword.vue'
import BookManage from '../components/admin/BookManage.vue'
import BorrowManage from '../components/admin/BorrowManage.vue'
import UserManage from '../components/admin/UserManage.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    name: 'UserHome',
    component: UserHome,
    path: '/userHome',
    children: [
      {
        path: '/user/bookList',
        name: 'BookList',
        component: BookList
      },
      {
        path: '/user/recommend',
        name: 'Recommend',
        component: Recommend
      },
      {
        path:'/user/userBorrow',
        name:'UserBorrow',
        component: UserBorrow
      },
      {
        path:'/user/userInfo',
        name:'UserInfo',
        component: UserInfo
      },
      {
        path:'/user/userPassword',
        name:'UserPassword',
        component: UserPassword
      }
    ]
  },
  {
    path:'/adminHome',
    name:'AdminHome',
    component: AdminHome,
    children: [
      {
        path:'/admin/bookManage',
        name:'BookManage',
        component: BookManage
      },
      {
        path:'/admin/userManage',
        name:'UserManage',
        component: UserManage
      },
      {
        path:'/admin/borrowManage',
        name:'BorrowManage',
        component: BorrowManage
      },
      {
        path:'/admin/adminPassword',
        name:'AdminPassword',
        component: AdminPassword
      }
    ]
  }
  
]

const router = new VueRouter({
  routes
})

export default router
