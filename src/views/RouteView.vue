<script setup lang="ts">
import Route from "@/components/route/RouteWrapper.vue";
</script>

<template>
  <main>
    <Suspense>
      <Route />
      <template #fallback>
        <q-spinner color="primary" size="3em" class="fixed-center" />
      </template>
    </Suspense>
  </main>
</template>
