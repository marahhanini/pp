<template>
  <header class="sticky top-0 z-30 bg-gray-50">
    <div class="h-12 md:h-14 flex items-center px-3 md:px-5">
      <!-- optional mobile brand -->
      <div class="flex items-center gap-2 md:hidden">
        <img src="/flowless.png" alt="flowless" class="h-6 w-6" />
        <span class="font-semibold text-lg text-[#1f6fb6]">flowless</span>
      </div>

      <!-- HAMBURGER: visible ONLY on small screens -->
      <button
        class="ml-auto p-2 -mr-1 md:hidden"
        @click="$emit('toggleSidebar')"
        aria-label="Open menu"
      >
        <Icon icon="mdi:menu" class="w-6 h-6 text-gray-600" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
defineEmits(["toggleSidebar"]);
</script>
