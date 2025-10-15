<template>
  <div class="grid md:grid-cols-2 gap-8 mt-8">
    <!-- 📈 Line Chart -->
    <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
      <h3 class="text-lg font-semibold text-gray-700 mb-3">Flow Over Time (Line)</h3>
      <Line :data="lineData" :options="chartOptions" />
    </div>

    <!-- 📊 Bar Chart -->
    <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
      <h3 class="text-lg font-semibold text-gray-700 mb-3">Zone Comparison (Bar)</h3>
      <Bar :data="barData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Line } from "vue-chartjs";

// Register Chart.js components
Chart.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement
);

// ✅ Line Chart Data
const lineData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Flow (m³/h)",
      data: [25, 28, 22, 30, 27, 32, 29],
      borderColor: "#1f6fb6",
      backgroundColor: "rgba(31,111,182,0.2)",
      tension: 0.4,
      fill: true,
    },
  ],
};

// ✅ Bar Chart Data
const barData = {
  labels: ["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5"],
  datasets: [
    {
      label: "Average Daily Demand (m³/day)",
      data: [120, 90, 130, 80, 100],
      backgroundColor: "#1f6fb6",
    },
  ],
};

// ✅ Common Chart Options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: "#374151" } },
    title: { display: false },
  },
  scales: {
    x: { ticks: { color: "#6b7280" }, grid: { color: "#f3f4f6" } },
    y: { ticks: { color: "#6b7280" }, grid: { color: "#f3f4f6" } },
  },
};
</script>

<style scoped>
div {
  height: 350px;
}
</style>
