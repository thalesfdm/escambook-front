import Vue from 'vue'
import Router from 'vue-router'
import TelaCadastro from '@/components/TelaCadastro'
import TelaInicial from '@/components/TelaInicial'
import TelaLogin from '@/components/TelaLogin'
import TelaPerfil from '@/components/TelaPerfil'

Vue.use(Router)

export const router = new Router({
  routes: [{
    path: '*',
    redirect: '/'
  },
  {
    path: '/cadastro',
    name: 'TelaCadastro',
    component: TelaCadastro,
    meta: { requiresLogout: true }
  },
  {
    path: '/',
    name: 'TelaInicial',
    component: TelaInicial
  },
  {
    path: '/login',
    name: 'TelaLogin',
    component: TelaLogin,
    meta: { requiresLogout: true }
  },
  {
    path: '/perfil',
    name: 'TelaPerfil',
    component: TelaPerfil,
    meta: { requiresAuth: true }
  }]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('x-auth-token');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresLogout)) {
    if (token) {
      next({
        path: '/perfil',
        query: {
          redirect: to.fullPath,
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});