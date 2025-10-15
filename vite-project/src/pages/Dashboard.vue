<script setup lang="ts">
import { Icon } from "@iconify/vue";
import ChartsView from "../components/ChartsView.vue";
import DataTable from "../components/DataTable.vue";
import MapView from "../components/MapView.vue";
import Template from "../components/Template.vue";

function onOpenLink() {
  navigator.clipboard?.writeText(window.location.href);
}
function onExportPdf() {
  // TODO: wire to your export
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

    <!-- Content -->
    <section class="space-y-6">
      <div>
        <h2 class="text-xl font-semibold mb-3">Water Demand Table</h2>
        <DataTable />
      </div>

      <div>
        <h2 class="text-xl font-semibold mb-3">Network Map</h2>
        <MapView />
      </div>

      <ChartsView />
    </section>
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
  border: 1px solid rgb(229 231 235); /* gray-200 */
  background: #fff;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.04);
}
.icon-btn:hover {
  background: rgb(243 244 246);
} /* gray-100 */
.icon-btn:focus {
  outline: 0;
  box-shadow: 0 0 0 3px rgb(31 111 182 / 0.3);
}
</style>
