<template>
  <div
    class="bg-[#f9fafb] border border-[#dae7f6] rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg transition cursor-pointer hover:bg-[#e8f1fb]"
  >
    <!-- Header -->
    <div class="flex justify-between items-start mb-2">
      <div>
        <h3 class="text-[#1f6fb6] font-semibold leading-tight">
          {{ title }}
        </h3>
        <p class="text-xs text-gray-500 mt-0.5">({{ date }})</p>
      </div>

      <div class="flex items-center gap-2 ml-auto">
        <!-- 📈 Chart icon → open chart modal -->
        <button
          @click.stop="$emit('chart')"
          title="View Chart"
          class="p-1 hover:bg-blue-50 rounded-md transition"
        >
          <Icon icon="mdi:chart-line" class="text-[#1f6fb6] text-lg" />
        </button>

        <!-- ↗ Expand icon → open details modal -->
        <button
          @click.stop="$emit('details')"
          title="View Details"
          class="p-1 hover:bg-gray-100 rounded-md transition"
        >
          <Icon icon="mdi:arrow-expand" class="text-gray-400 text-lg" />
        </button>
      </div>
    </div>

    <!-- Value -->
    <div class="flex justify-between items-center mt-auto">
      <div>
        <p class="text-2xl font-semibold text-gray-800">
          {{ value }} <span class="text-base text-gray-400">{{ unit }}</span>
        </p>
      </div>

      <!-- Navigation Arrows -->
      <div class="text-gray-400 text-sm flex items-center gap-1">
        <span class="text-[#1f6fb6] font-semibold">1 / 1</span>
        <Icon icon="mdi:arrow-right-bold" class="text-[#1f6fb6] text-3xl ml-2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps({
  title: String,
  date: String,
  value: [Number, String],
  unit: String,
});
defineEmits(["chart", "details"]);
</script>
