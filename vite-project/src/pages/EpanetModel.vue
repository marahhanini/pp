<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Template from "../components/Template.vue";

const copyLink = () => navigator.clipboard?.writeText(window.location.href);
const exportPdf = () => {
  // TODO: hook this to your export logic
};
</script>

<template>
  <Template pageTitle="Model View">
    <!-- Right-side actions in the header -->
    <template #actions>
      <button class="icon-btn" title="Copy link" @click="copyLink">
        <Icon icon="mdi:link-variant" class="w-5 h-5 text-gray-600" />
      </button>
      <button class="icon-btn" title="Export PDF" @click="exportPdf">
        <Icon icon="mdi:file-pdf-box" class="w-5 h-5 text-gray-600" />
      </button>
    </template>

    <!-- Page body -->
    <div class="p-4 bg-white rounded-lg shadow">
      <p class="text-gray-700">Model View content…</p>
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
  border: 1px solid rgb(229 231 235); /* gray-200 */
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
