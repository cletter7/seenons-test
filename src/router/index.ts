import { createRouter, createWebHistory } from "vue-router";
import RouteView from "@/views/RouteView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: RouteView,
    },
    {
      path: "/stops/:id",
      name: "route-stop",
      component: () => import("@/views/StopView.vue"),
    },
  ],
});

export default router;
