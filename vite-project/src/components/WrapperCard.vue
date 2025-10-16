<template>
  <div class="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>

      <!-- ✅ slot for actions like view toggles or filters -->
      <div>
        <slot name="actions"></slot>
      </div>
    </div>

    <!-- Main content -->
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
});
</script>
