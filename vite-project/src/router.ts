import { createRouter, createWebHistory } from "vue-router";
import ControlCenter from "./pages/ControlCenter.vue";
import Dashboard from "./pages/Dashboard.vue";
import EpanetDefault from "./pages/EpanetDefault.vue";
import EpanetDemo from "./pages/EpanetDemo.vue";
import EpanetModel from "./pages/EpanetModel.vue";
import NoAuth from "./pages/NoAuth.vue";
import NotFound from "./pages/NotFound.vue";
import WaterQuality from "./pages/WaterQuality.vue";
import Pumps from "./pages/pumps.vue";
import Valves from "./pages/valves.vue";
import { useAuth } from "./stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: () => {
        const token = localStorage.getItem("token");
        return token ? "/dashboard" : "/login";
      },
    },
    { path: "/login", component: () => import("./pages/Login.vue") },
    { path: "/dashboard", component: Dashboard },

    { path: "/water", component: WaterQuality },
    { path: "/control", component: ControlCenter },
    { path: "/epanet", component: EpanetDemo },
    { path: "/epanet/model", component: EpanetModel },
    { path: "/epanet/default", component: EpanetDefault },
    { path: "/control/pumps", component: Pumps },
    { path: "/control/valves", component: Valves },
    { path: "/no-auth", component: NoAuth },
    { path: "/:pathMatch(.*)*", component: NotFound },
  ],
});

// ✅ Single global guard
// ✅ Global guard (single)
router.beforeEach((to, from, next) => {
  const auth = useAuth();
  const isAuthenticated = !!auth.token;
  const isLoginPage = to.path === "/login";

  if (!isAuthenticated && !isLoginPage) {
    next("/login");
  } else if (isAuthenticated && isLoginPage) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
