import firebase from 'firebase';
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import repair from "./views/repair";
import RPlist from "./views/RPlist";
import statistic from "./views/statistic";
import Hrepair from "./views/Hrepair";
import tncrepair from "./views/tncrepair";
import domiATD from "./views/domiATD";
import id from "./views/tncrepair/id";
import _id from "./views/domiATD/_id";
import H_id from "./views/Hrepair/H_id";
import fixrepair from "./views/fixrepair";
import edituser from "./views/edituser";
import problem from "./views/problem";



Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresGuest: true
      }
    },
    
    {
      path: "/repair",
      name: "repair",
      component: repair,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/domiATD",
      name: "domiATD",
      component: domiATD,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/domiATD/:_id",
      name: "name1",
      component: _id,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/tncrepair",
      name: "tncrepair",
      component: tncrepair,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tncrepair/:id',
      name: 'name',
      component: id,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/Hrepair",
      name: "Hrepair",
      component: Hrepair,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/Hrepair/:H_id",
      name: "name2",
      component: H_id,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/RPlist",
      name: "RPlist",
      component: RPlist,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/statistic",
      name: "statistic",
      component: statistic,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/fixrepair",
      name: "fixrepair",
      component: fixrepair,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edituser",
      name: "edituser",
      component: edituser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/problem",
      name: "problem",
      component: problem,
      meta: {
        requiresAuth: true
      }
    },

   
    
  ]
});

// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      
      next();
    }

  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/statistic',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;