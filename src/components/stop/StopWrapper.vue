<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import StopOrder from "@/components/stop/StopOrder.vue";
import { useRouteStore } from "@/stores/route";
import { Status, type RouteStop } from "@/types";

const router = useRouter();

const props = defineProps<{
  stop: RouteStop;
}>();

const allOrdersCompleted = computed(() =>
  props.stop.orders.every((order) => order.status === Status.COMPLETED)
);
const routeStore = useRouteStore();

const onStopComplete = () => {
  routeStore.completeStop(props.stop.stop_id);
  router.push("/");
};
</script>

<template>
  <h3>Stop: {{ stop.name }}</h3>
  <p class="text-body1">
    <q-icon name="location_on" size="sm" />
    {{ stop.address.street }},
    {{ stop.address.house_number }}
    {{ stop.address.town }}
    {{ stop.address.postal_code }}
  </p>
  <p class="text-body1" v-if="stop.telephone">
    <q-icon name="call" size="sm" />
    <a :href="'tel:' + stop.telephone">
      {{ stop.telephone }}
    </a>
  </p>
  <p class="text-body1" v-if="stop.comment">
    <q-icon name="comment" size="sm" />
    {{ stop.comment }}
  </p>
  <StopOrder
    v-for="order in stop.orders"
    :key="order.order_id"
    :order="order"
    :stop-id="stop.stop_id"
  />
  <p v-if="!allOrdersCompleted">Complete all orders to complete the stop</p>
  <q-btn
    color="primary"
    label="Complete stop"
    :disable="!allOrdersCompleted"
    v-if="stop.status !== Status.COMPLETED"
    :onclick="onStopComplete"
  />
</template>
