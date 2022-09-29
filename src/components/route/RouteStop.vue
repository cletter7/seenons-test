<script setup lang="ts">
import { ref } from "vue";
import OrderBadge from "@/components/route/RouteStopOrder.vue";
import { Status, type RouteStop } from "@/types";

const props = defineProps<{
  stop: RouteStop;
  isNext: boolean;
}>();
const isCompleted = ref(props.stop.status === Status.COMPLETED);
</script>

<template>
  <q-card
    flat
    bordered
    :class="{
      'stop-card': true,
      'stop-card--next': isNext,
      'bg-green-5': isCompleted,
      'bg-grey-2': !isCompleted,
    }"
  >
    <q-card-section>
      <div class="text-h6">{{ stop.name }}{{ stop.status }}</div>
      <div class="text-subtitle1">
        <div class="row q-col-gutter-sm">
          <div class="col-auto">
            <q-icon name="location_on" size="sm" />
          </div>
          <div class="col">
            {{ stop.address.street.trim() }}, {{ stop.address.house_number
            }}<br />
            {{ stop.address.town }},
            {{ stop.address.postal_code }}
          </div>
        </div>
      </div>
      <div class="text-subtitle1" v-if="stop.telephone">
        <div class="row q-col-gutter-sm">
          <div class="col-auto">
            <q-icon name="call" size="sm" />
          </div>
          <div class="col">
            <a :href="'tel:' + stop.telephone">
              {{ stop.telephone }}
            </a>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-section v-if="stop.comment">
      <div class="text-body2">
        <div class="row q-col-gutter-sm">
          <div class="col-auto">
            <q-icon name="comment" size="sm" />
          </div>
          <div class="col">
            {{ stop.comment }}
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="text-body1">Orders ({{ stop.orders.length }}):</div>
      <OrderBadge
        v-for="order in stop.orders"
        :key="order.order_id"
        :order="order"
        :is-stop-completed="isCompleted"
      />
    </q-card-section>

    <q-separator />

    <q-card-actions v-if="!isCompleted">
      <q-btn
        :to="`/stops/${stop.stop_id}`"
        color="primary"
        icon="sync"
        label="Process orders"
      />
      <q-btn color="secondary" icon="directions" label="Get directions" />
    </q-card-actions>
  </q-card>
</template>

<style scoped>
.stop-card {
  margin-bottom: 1rem;
}
.stop-card--next {
  box-shadow: rgba(29, 162, 219, 1) 0px 0px 8px !important;
}
</style>
