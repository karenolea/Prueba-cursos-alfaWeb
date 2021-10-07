import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebaseApp from '../config/firebase.js'
import { getAuth } from 'firebase/auth'
import Edit from '../components/Edit.vue'
import NotFound from '../components/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      login: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue')
  },
  {
    path: '/registrar',
    name: 'Registrar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Registrar.vue')
  },
  {
    path: '/administracion',
    name: 'Administracion',
    component: () => import(/* webpackChunkName: "about" */ '../views/Administracion.vue'),
    meta: {
      login: true
    }
  },
  {
    path: 'edit/:id',
    name: 'Edit',
    component: Edit,
    meta: {
      login: true
    }
  },
  {
    path: '*',
    name: NotFound,
    component: NotFound
  }

]

const router = new VueRouter({
  routes
})
//para verificar si se muestra la ruta
router.beforeEach((to, from, next) => {
  const requiereAutenticacion = to.matched.some((ruta) => ruta.meta.login)// verifica que la ruta a la que se dirije requiere autenticacion
  const usuario = getAuth(firebaseApp).currentUser //pregunta a firebase si el ususario esta autenticado
  console.log(requiereAutenticacion, usuario);
  if (!usuario && requiereAutenticacion) {
    next({ name: 'Login' })//redirecciona a login
  }
  else {
    next()//sigue ejecutando el proceso normal 
  }
})

export default router
