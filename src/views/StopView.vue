<script setup lang="ts">
import { useRoute } from "vue-router";
import StopWrapper from "@/components/stop/StopWrapper.vue";
import { useRouteStore } from "@/stores/route";

const stopId = Number(useRoute().params.id);
const routeStore = useRouteStore();
const stop = routeStore.route?.stops.find((stop) => stop.stop_id === stopId);
</script>

<template>
  <main>
    <StopWrapper :stop="stop" v-if="stop" />
    <q-banner inline-actions class="text-white bg-red" v-else>
      No data for the stop
      <template v-slot:action>
        <q-btn to="/" flat color="white" label="Return to route" />
      </template>
    </q-banner>
  </main>
</template>
