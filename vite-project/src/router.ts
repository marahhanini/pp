import { createRouter, createWebHistory } from "vue-router";

// pages (make sure these files exist)
import ControlCenter from "./pages/ControlCenter.vue";
import Dashboard from "./pages/Dashboard.vue";
import Login from "./pages/Login.vue";
import WaterQuality from "./pages/WaterQuality.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/login", component: Login },
    { path: "/", component: Dashboard },
    { path: "/water", component: WaterQuality },
    { path: "/control", component: ControlCenter },
    // optional 404:
    // { path: '/:pathMatch(.*)*', component: NotFound }
  ],
});

export default router;
