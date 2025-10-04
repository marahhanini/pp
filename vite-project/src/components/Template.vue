<script setup lang="ts">
import Header from "./Header.vue";

defineProps<{
  pageTitle: string;
}>();
</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <Header :pageTitle="pageTitle" />

    <!-- Page content -->
    <main class="flex-1 p-6 bg-gray-50 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>
