/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import { routes } from "vue-router/auto-routes";
import Dashbord from "@/layouts/dashbord.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("@/pages/(auth)/login.vue"),
    },
    {
      path: "/",
      component: Dashbord,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/home",
          name: "Home",
          component: () => import("@/pages/index.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/token",
          name: "token",
          component: () => import("@/pages/token.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/billing",
          name: "billing",
          component: () => import("@/pages/billing.vue"),
          meta: { requiresAuth: true },
        },
      ],
    },

    {
      path: "/login",
      name: "Login",
      component: () => import("@/pages/(auth)/login.vue"),
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("@/pages/(auth)/signup.vue"),
    },
  ],
});

// Navigation guard for route protection
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const isAuthRoute = to.path === "/login" || to.path === "/signup";
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !token) {
    next("/login");
  } else if (isAuthRoute && token) {
    next("/home");
  } else {
    next();
  }
});

router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (localStorage.getItem("vuetify:dynamic-reload")) {
      console.error("Dynamic import error, reloading page did not fix it", err);
    } else {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
