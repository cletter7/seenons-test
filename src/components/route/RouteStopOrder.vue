<script setup lang="ts">
import { OrderType, type Order } from "@/types";
import { STREAM_TYPE_LABELS } from "@/constants";
defineProps<{
  order: Order;
  isStopCompleted: boolean;
}>();
</script>

<template>
  <q-chip
    square
    :color="isStopCompleted ? 'green-6' : 'grey-4'"
    :icon="order.type === OrderType.PICKUP ? 'file_download' : 'file_upload'"
  >
    {{ order.quantity }} x {{ order.size }}L
    {{ STREAM_TYPE_LABELS[order.stream_type] }}
  </q-chip>
</template>
