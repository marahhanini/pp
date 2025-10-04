<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  pageTitle: string;
}>();
</script>

<template>
  <header class="flex items-center justify-between px-6 py-4 bg-gray-50 border-gray-200">
    <!-- Title -->
    <h1 class="flex items-center text-2xl font-bold text-gray-800">
      <Icon icon="mdi:view-dashboard-outline" class="w-6 h-6 text-blue-500 mr-2" />
      {{ pageTitle }}
    </h1>

    <!-- Actions -->
    <div class="flex items-center gap-3">
      <button class="p-2 rounded hover:bg-gray-100">
        <Icon icon="f7:personalhotspot" class="w-5 h-5 text-gray-500" />
      </button>
      <button class="p-2 rounded hover:bg-gray-100">
        <Icon icon="mdi:file-pdf-box" class="w-5 h-5 text-gray-500" />
      </button>
    </div>
  </header>
</template>
