<template>
  <div class="w-full h-[400px]">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { nextTick, onMounted, ref } from "vue";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const chartCanvas = ref(null);
let chartInstance = null;

onMounted(async () => {
  await nextTick();
  const ctx = chartCanvas.value?.getContext("2d");
  if (!ctx) {
    console.warn("⚠️ Canvas context missing!");
    return;
  }

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Oct 10", "Oct 12", "Oct 14", "Oct 16", "Oct 18", "Oct 20", "Oct 22"],
      datasets: [
        {
          label: "Hourly Destination Flow (m³/h)",
          data: [0, 80, 82, 81, 83, 82, 84],
          borderColor: "#1f6fb6",
          backgroundColor: "rgba(31,111,182,0.15)",
          tension: 0.3,
          borderWidth: 2,
          fill: true,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, labels: { color: "#1f6fb6" } },
      },
      scales: {
        x: { grid: { color: "#eee" }, ticks: { color: "#555" } },
        y: { beginAtZero: true, grid: { color: "#eee" }, ticks: { color: "#555" } },
      },
    },
  });

  console.log("✅ Chart created successfully!");
});
</script>
