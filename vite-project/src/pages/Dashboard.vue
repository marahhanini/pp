<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { onMounted } from "vue";
import DataTable from "../components/DataTable.vue";
import MapView from "../components/MapView.vue";
import Template from "../components/Template.vue";
import WrapperCard from "../components/WrapperCard.vue";
import { useDataTableStore } from "../services/data-table.service";

const dataTableStore = useDataTableStore();

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

    <div class="space-y-6">
      <WrapperCard title="Water Demand (API)">
        <template #actions>
          <button @click="dataTableStore.loadData()" class="text-sm text-[#1f6fb6] hover:underline">
            Refresh
          </button>
        </template>

        <div v-if="dataTableStore.loading" class="text-gray-500">Loading data...</div>
        <div v-else-if="dataTableStore.error" class="text-red-600">
          {{ dataTableStore.error }}
        </div>
        <div v-else>
          <h3 class="text-lg font-semibold mb-2">
            Water Demand Table ({{ dataTableStore.data.length }} items)
          </h3>
          <DataTable :rows="dataTableStore.data" />
        </div>
      </WrapperCard>

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
