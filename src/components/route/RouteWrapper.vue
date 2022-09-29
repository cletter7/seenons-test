<script setup lang="ts">
import RouteStop from "@/components/route/RouteStop.vue";
import { useRouteStore } from "@/stores/route";
import { fetchData } from "@/utils/fetchData";
import { Status, type Route } from "@/types";

const store = useRouteStore();

if (!store.route) {
  const route = await fetchData();

  store.setRoute(route);
}

const route = store.route as Route;
const nextStop = route.stops.find((stop) => stop.status !== Status.COMPLETED);
</script>

<template>
  <div>
    <h2>Route: {{ route.name }}</h2>
    <RouteStop
      v-for="stop in route.stops"
      :key="stop.name"
      :stop="stop"
      :is-next="stop === nextStop"
    ></RouteStop>
  </div>
</template>

<style scoped></style>
