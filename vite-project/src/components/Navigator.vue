<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import type { MenuItem } from "../types/menu";
import SubMenu from "./SubMenu.vue";

const items = ref<MenuItem[]>([
  { name: "dashboard", label: "Dashboard", to: "/", icon: "mdi:view-dashboard-outline" },
  { name: "water", label: "Water Quality", to: "/water", icon: "mdi:water-outline" },

  {
    name: "control",
    label: "Control center",
    icon: "mdi:tune-vertical",
    subPage: [
      { name: "pumps", label: "Pumps", to: "/control/pumps" },
      { name: "valves", label: "Valves", to: "/control/valves" },
    ],
  },

  {
    name: "epanet",
    label: "Epanet Demo",
    icon: "mdi:map-outline",
    subPage: [
      { name: "ep-home", label: "Epanet Demo", to: "/epanet" },
      { name: "ep-model", label: "Model View", to: "/epanet/model" },
      {
        name: "ep-default",
        label: "Default View",
        to: "/epanet/default",
      },
    ],
  },

  {
    name: "alerts",
    label: "Alerts",
    icon: "mdi:alert-octagon-outline",
    subPage: [
      { name: "new", label: "New", to: "/alerts/new" },
      { name: "history", label: "History", to: "/alerts/history" },
    ],
  },

  { name: "zones", label: "Zones", icon: "bx:shape-square", subPage: [] },
  { name: "monitor", label: "Monitoring", icon: "mdi:monitor-dashboard", subPage: [] },
  { name: "reports", label: "Reports", icon: "mdi:clipboard-text-outline", subPage: [] },
  { name: "losses", label: "Losses", icon: "mdi:water-percent", to: "/losses" },
  { name: "devices", label: "Devices", icon: "mdi:radiobox-marked", to: "/devices" },
  { name: "predictions", label: "Predictions", to: "/predictions", icon: "mdi:chart-line" },
  { name: "anomalies", label: "Anomalies", to: "/anomalies", icon: "mdi:alert-circle-outline" },
  { name: "ondemand", label: "On Demand", to: "/on-demand", icon: "mdi:monitor" },
  { name: "incidents", label: "Incidents", to: "/incidents", icon: "mdi:alert" },
  { name: "octopo", label: "Octopo", to: "/octopo", icon: "mdi:hexagon-outline" },
  {
    name: "leak-inspector",
    label: "Leak Inspector",
    to: "/leak-inspector",
    icon: "streamline:location-pin-3",
  },
  { name: "events", label: "Events", to: "/events", icon: "mdi:calendar-outline" },
  {
    name: "leak-localization",
    label: "Leak Localization",
    to: "/leak-localization",
    icon: "mdi:pipe-leak",
  },

  {
    name: "dynamic",
    label: "Dynamic",
    icon: "mdi:folder-outline",
    subPage: [{ name: "auto-page3", label: "Auto Dynamic Page3", to: "/dynamic/page3" }],
  },
  { name: "marah", label: "marah", icon: "mdi:account", subPage: [] },
  { name: "settings", label: "Settings", to: "/settings", icon: "mdi:cog" },
  { name: "faq", label: "FAQ", to: "/faq", icon: "akar-icons:chat-question" },
]);

const collapsed = ref(false);
</script>

<template>
  <aside
    :class="[
      'h-screen flex flex-col bg-white border-r border-gray-200',
      collapsed ? 'w-[78px]' : 'w-[320px]',
    ]"
  >
    <!-- Header -->
    <div class="flex items-center gap-3 px-4 py-3">
      <img src="/flowless.png" alt="flowless" class="h-7 w-7" />
      <span v-if="!collapsed" class="text-2xl font-semibold text-[#1f6fb6]"> flowless </span>
      <button
        class="ml-auto text-gray-500 hover:text-gray-700"
        @click="collapsed = !collapsed"
        :title="collapsed ? 'Expand' : 'Collapse'"
      >
        <span class="text-xl"> {{ collapsed ? "»" : "«" }} </span>
      </button>
    </div>

    <div class="border-t border-gray-200 my-2" />

    <!-- Menu list -->
    <nav class="overflow-y-auto px-3 pb-4 flex-1">
      <ul class="space-y-1">
        <li v-for="item in items" :key="item.name">
          <SubMenu :item="item" :collapsed="collapsed" />
        </li>
      </ul>
    </nav>

    <!-- Footer -->
    <div v-if="!collapsed" class="px-4 py-3 border-t border-gray-200 bg-white">
      <div class="flex items-center gap-3">
        <div
          class="h-10 w-10 rounded-full bg-[#e9f1fb] grid place-items-center text-[#2d6bbb] font-semibold"
        >
          FR
        </div>
        <div>
          <div class="font-semibold text-gray-900">Front end</div>
          <div class="text-sm text-gray-500">Front end</div>
        </div>
        <Icon icon="mdi:logout" class="ml-auto w-5 h-5 text-gray-500 hover:text-[#1f6fb6]" />
      </div>
    </div>
  </aside>
</template>
