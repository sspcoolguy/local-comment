import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import ViewProfile from '@/components/profile/ViewProfile'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile/:id',
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 인증필요확인
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    //사용자 인증상태 확인
    let user = firebase.auth().currentUser

    if(user){
      //사용자로그인하여 진행
      next()
    }

    else{
      // 로그인하지않아서 로그인화면으로 리디렉션
      next({ name: 'Login' })
    }
  }

  else{
    next()
  }
})

export default router
