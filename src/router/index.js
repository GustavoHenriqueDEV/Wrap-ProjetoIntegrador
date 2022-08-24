import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../plugins/firebase";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/Default"),
    meta: {
      //requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "/perfil",
        name: "perfil",
        component: () =>
          import(/* webpackChunkName: "perfil" */ "../views/perfil.vue"),
      },
      {
        path: "/adicionarReceita",
        name: "adicionarReceita",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "perfil" */ "../views/adicionarReceita.vue"
          ),
      },
      {
        path: "/minhasReceitas",
        name: "MinhasReceitas",
        component: () =>
          import(
            /* webpackChunkName: "perfil" */ "../views/minhasReceitas.vue"
          ),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/Blank"),
    children: [
      {
        path: "/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/login.vue"),
      },
    ],
  },
  {
    path: "/dscReceita",
    name: "descReceita",
    props: true,
    component: () =>
      import(/* webpackChunkName: "perfil" */ "../views/dscReceita.vue"),
  },
  {
    path: "/comentario",
    name: "comentario",
    props: true,
    component: () =>
      import(/* webpackChunkName: "perfil" */ "../views/comentario.vue"),
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
