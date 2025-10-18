<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { onMounted, ref } from "vue";
import CardMetric from "../components/CardMetric.vue";
import HourlyDestinationFlowChart from "../components/HourlyDestinationFlowChart.vue";
import Modal from "../components/Modal.vue";
import MultiView from "../components/MultiView.vue";
import Template from "../components/Template.vue";
import WrapperCard from "../components/WrapperCard.vue";
import { useDataTableStore } from "../services/data-table.service";

const showModal = ref(false);
const dataTableStore = useDataTableStore();
const showChartModal = ref(false);
const openChartModal = () => (showChartModal.value = true);
const showDetailsModal = ref(false);
const openDetailsModal = () => (showDetailsModal.value = true);
onMounted(() => {
  dataTableStore.loadData();
});

function onOpenLink() {
  navigator.clipboard?.writeText(window.location.href);
}
function onExportPdf() {
  /* wire to your export */
}
</script>
<template>
  <Template pageTitle="Dashboard">
    <template #actions>
      <button class="icon-btn" title="Copy link" @click="onOpenLink">
        <Icon icon="mdi:link-variant" class="w-5 h-5 text-gray-600" />
      </button>
      <button class="icon-btn" title="Export PDF" @click="onExportPdf">
        <Icon icon="mdi:file-pdf-box" class="w-5 h-5 text-gray-600" />
      </button>
    </template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <CardMetric
        title="Hourly Destination Flow"
        date="23 Oct 2022 – 4:00 AM"
        value="83.06"
        unit="m³/h"
        @chart="openChartModal"
        @details="openDetailsModal"
      />

      <!-- Chart Modal -->
      <Modal :visible="showChartModal" @close="showChartModal = false">
        <template v-if="showChartModal">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-[#1f6fb6] font-semibold text-lg">Hourly Destination Flow</h3>
            <button
              @click="showChartModal = false"
              class="border border-[#1f6fb6] text-[#1f6fb6] px-3 py-1 rounded-md hover:bg-[#1f6fb6] hover:text-white transition"
            >
              Discard
            </button>
          </div>

          <!-- 🧩 Chart component will now mount only after modal DOM is visible -->
          <HourlyDestinationFlowChart />
        </template>
      </Modal>

      <!-- Details Modal -->
      <Modal :visible="showDetailsModal" @close="showDetailsModal = false">
        <div class="text-gray-800 space-y-2">
          <h3 class="text-[#1f6fb6] font-semibold text-lg mb-2">Hourly Destination Flow</h3>
          <p><b>Date:</b> 23 Oct 2022 – 4:00 AM</p>
          <p><b>Value:</b> 83.06 m³/h</p>
          <p><b>Status:</b> Active</p>
          <hr class="my-2 border-gray-200" />
          <p class="text-sm text-gray-500">Installed 2024, calibrated quarterly.</p>
        </div>
      </Modal>

      <!-- Add other cards below -->
    </div>

    <!-- Modal (optional, for details/chart) -->
    <Modal v-if="showModal" @close="showModal = false">
      <h3 class="text-[#1f6fb6] font-semibold mb-2">Hourly Destination Flow</h3>
      <p>Detailed chart or info goes here...</p>
    </Modal>

    <div class="space-y-6">
      <!-- ✅ Water Demand card -->
      <WrapperCard title="Water Demand (API)">
        <template #actions>
          <button @click="dataTableStore.loadData()" class="text-sm text-[#1f6fb6] hover:underline">
            Refresh
          </button>
        </template>

        <MultiView />
      </WrapperCard>

      <!-- 🌍 Network Map -->
      <WrapperCard title="Network Map">
        <MapView />
      </WrapperCard>
    </div>
  </Template>
</template>

<style scoped>
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 0.5rem;
  background: #fff;
  border: 1px solid rgb(229 231 235);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.04);
}
.icon-btn:hover {
  background: rgb(243 244 246);
}
.icon-btn:focus {
  outline: 0;
  box-shadow: 0 0 0 3px rgb(31 111 182 / 0.3);
}
</style>
