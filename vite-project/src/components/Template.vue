<script setup lang="ts">
const props = defineProps<{ pageTitle?: string }>();
</script>

<template>
  <div class="w-full max-w-none">
    <!-- Title row -->
    <div class="flex items-center gap-3 mb-4 md:mb-6">
      <!-- EXACT look: big, heavy, blue -->
      <h1 class="font-extrabold leading-tight text-[#1f6fb6] text-[20px] md:text-[25px]">
        {{ pageTitle }}
      </h1>

      <!-- Right actions -->
      <div class="ml-auto flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>

    <slot />
  </div>
</template>
