<script setup lang="ts">
import { useRouteStore } from "@/stores/route";
import { OrderType, Status, type Order } from "@/types";
import {
  ORDER_TYPE_LABELS,
  ISSUE_TYPES,
  ISSUE_ID_TO_LABEL,
  STREAM_TYPE_LABELS,
} from "@/constants";
import { computed } from "vue";

const props = defineProps<{
  stopId: number;
  order: Order;
}>();

const isCompleted = computed(() => props.order.status === Status.COMPLETED);
const routeStore = useRouteStore();
</script>

<template>
  <q-card
    :class="{
      order: true,
      'bg-green-3': isCompleted,
    }"
  >
    <q-card-section>
      <div class="row">
        <div class="col text-h6">
          {{ STREAM_TYPE_LABELS[order.stream_type] }}, {{ order.size }}L
        </div>
        <div class="col-auto">
          <q-icon
            :name="
              order.type === OrderType.PICKUP ? 'file_download' : 'file_upload'
            "
            size="sm"
          />
          {{ ORDER_TYPE_LABELS[order.type] }}
        </div>
      </div>
    </q-card-section>

    <q-card-section v-if="isCompleted">
      Quanity: {{ order.quantity }}
    </q-card-section>

    <q-card-section v-else>
      <p>Quanity <span>(adjust if needed)</span>:</p>
      <q-btn
        round
        color="blue-grey-6"
        icon="remove"
        @click="routeStore.decreaseOrderQuanity(stopId, order.order_id)"
        :disable="order.quantity === 0"
      />
      <span class="text-body1 quantity">{{ order.quantity }}</span>
      <q-btn
        round
        color="blue-grey-6"
        icon="add"
        @click="routeStore.increaseOrderQuanity(stopId, order.order_id)"
      />
    </q-card-section>

    <q-card-section v-if="order.issues?.length">
      <div><b>Issues:</b></div>
      <div v-for="issue in order.issues" :key="issue">
        {{ ISSUE_ID_TO_LABEL[issue] }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions v-if="!isCompleted">
      <q-btn
        flat
        color="green"
        @click="routeStore.completeOrder(stopId, order.order_id)"
        label="Complete"
      />
      <q-btn-dropdown flat color="orange" label="Report issue">
        <q-list>
          <q-item
            v-for="issue in ISSUE_TYPES"
            :key="issue.id"
            clickable
            v-close-popup
            @click="routeStore.addIssue(stopId, order.order_id, issue.id)"
          >
            <q-item-section>
              <q-item-label>{{ issue.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-card-actions>
  </q-card>
</template>

<style scoped>
.order {
  margin-bottom: 2rem;
}
.quantity {
  margin: 0 10px;
}
</style>
