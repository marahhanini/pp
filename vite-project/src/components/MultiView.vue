<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useDataTableStore } from "../services/data-table.service";
import ChartView from "./ChartsView.vue";
import DataTable from "./DataTable.vue";

const currentView = ref<"table" | "chart">("table");
const dataTableStore = useDataTableStore();

onMounted(() => {
  // Load data when component mounts
  dataTableStore.loadData();
});
</script>
<template>
  <div>
    <!-- Toggle -->
    <div class="flex justify-end mb-4">
      <div class="inline-flex bg-gray-100 rounded-lg p-1 shadow-inner">
        <button
          @click="currentView = 'table'"
          class="px-4 py-1.5 rounded-md font-medium text-sm transition-all duration-200"
          :class="[
            currentView === 'table'
              ? 'bg-[#1f6fb6] text-white shadow-md'
              : 'text-[#1f6fb6] hover:bg-blue-50',
          ]"
        >
          <i class="mdi mdi-table text-base mr-1"></i> Table
        </button>

        <button
          @click="currentView = 'chart'"
          class="px-4 py-1.5 rounded-md font-medium text-sm transition-all duration-200"
          :class="[
            currentView === 'chart'
              ? 'bg-[#1f6fb6] text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-200',
          ]"
        >
          <i class="mdi mdi-chart-line text-base mr-1"></i> Chart
        </button>
      </div>
    </div>

    <!-- Content -->
    <transition name="fade" mode="out-in">
      <div v-if="currentView === 'table'" key="table">
        <DataTable :rows="dataTableStore.data" />
      </div>
      <div v-else key="chart">
        <ChartView />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
