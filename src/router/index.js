import Vue from 'vue'
import Router from 'vue-router'
import UserLoginManager from '@/Application/Users/Apps/UserLoginManager'
import DashboardMainManager from '@/Application/Dashboards/Apps/DashboardMainManager'
import PolyMainManager from '@/Application/Polys/Apps/PolyMainManager'
import MedicineMainManager from '@/Application/Medicines/Apps/MedicineMainManager'
import DoctorMainManager from '@/Application/Doctors/Apps/DoctorMainManager'
import PatientMainManager from '@/Application/Patients/Apps/PatientMainManager'
import RegisterMainManager from '@/Application/Registers/Apps/RegisterMainManager'
import RegisterComposeManager from '@/Application/Registers/Apps/RegisterComposeManager'
import RecipeMainManager from '@/Application/Recipes/Apps/RecipeMainManager'
import RecipeComposeManager from '@/Application/Recipes/Apps/RecipeComposeManager'
import PaymentMainManager from '@/Application/Payments/Apps/PaymentMainManager'
import CounterMainManager from '@/Application/Counters/Apps/CounterMainManager'
import CounterPublicManager from '@/Application/Counters/Apps/CounterPublicManager'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'UserLoginManager',
      component: UserLoginManager,
      meta: {
        requiresAuth: false,
        loggedCheck: true
      }
    },
    {
      path: '/dashboards',
      name: 'DashboardMainManager',
      component: DashboardMainManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/registers',
      name: 'RegisterMainManager',
      component: RegisterMainManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/poly',
      name: 'PolyMainManager',
      component: PolyMainManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/medicines',
      name: 'MedicineMainManager',
      component: MedicineMainManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/doctors',
      name: 'DoctorMainManager',
      component: DoctorMainManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/patients',
      name: 'PatientMainManager',
      component: PatientMainManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/registers/:id',
      name: 'RegisterComposeManager',
      component: RegisterComposeManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/recipes',
      name: 'RecipeMainManager',
      component: RecipeMainManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/recipes/:id',
      name: 'RecipeComposeManager',
      component: RecipeComposeManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/payments',
      name: 'PaymentMainManager',
      component: PaymentMainManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/counters',
      name: 'CounterMainManager',
      component: CounterMainManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/counter-publics',
      name: 'CounterPublicManager',
      component: CounterPublicManager,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.loggedCheck)) {
    if (localStorage.getItem('token') !== null) {
      next({
        name: 'DashboardMainManager'
      })
    } else {
      next()
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') === null) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
