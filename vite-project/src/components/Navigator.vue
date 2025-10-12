<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useAuth } from "../stores/auth";
import type { MenuItem } from "../types/menu";
import SubMenu from "./SubMenu.vue";

const auth = useAuth();

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
      { name: "ep-default", label: "Default View", to: "/epanet/default" },
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
  {
    name: "marah",
    label: "marah",
    icon: "mdi:account",
    subPage: [{ name: "logout", label: "Logout", to: "/logout" }],
  },
  { name: "settings", label: "Settings", to: "/settings", icon: "mdi:cog" },
  { name: "faq", label: "FAQ", to: "/faq", icon: "akar-icons:chat-question" },
]);

const collapsed = ref(false);

const handleLogout = () => {
  auth.logout();
};
</script>

<template>
  <aside
    class="bg-white border-r border-gray-200 font-sans text-[15px] text-gray-800 flex flex-col justify-between transition-all duration-300 ease-in-out"
    :class="[collapsed ? 'w-20' : 'w-64']"
  >
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-3">
      <img src="/flowless.png" alt="flowless" class="h-7 w-7" />
      <span v-if="!collapsed" class="text-2xl font-semibold text-[#1f6fb6]">flowless</span>
      <button
        class="ml-auto text-gray-500 hover:text-gray-700"
        @click="collapsed = !collapsed"
        :title="collapsed ? 'Expand' : 'Collapse'"
      >
        <span class="text-xl">{{ collapsed ? "»" : "«" }}</span>
      </button>
    </div>

    <div class="border-t border-gray-200 my-2" />

    <!-- Menu -->
    <nav class="flex-1 overflow-y-auto px-2 pb-4">
      <ul class="space-y-[4px]">
        <li
          v-for="item in items"
          :key="item.name"
          class="bg-white transition-all duration-200 rounded-md"
          :class="{ 'justify-center': collapsed }"
        >
          <SubMenu :item="item" :collapsed="collapsed" @logout="handleLogout" />
        </li>
      </ul>
    </nav>

    <!-- Footer -->
    <div
      class="px-4 py-3 border-t border-gray-200 bg-white flex items-center justify-between transition-all duration-300"
      :class="{ 'justify-center': collapsed }"
    >
      <!-- Avatar -->
      <div
        class="h-10 w-10 rounded-full bg-[#e9f1fb] grid place-items-center text-[#2d6bbb] font-semibold"
      >
        FR
      </div>

      <!-- User Info -->
      <div v-if="!collapsed" class="flex flex-col ml-3">
        <div class="font-semibold leading-tight">Front end</div>
        <div class="text-sm text-gray-500 leading-tight">Front end</div>
      </div>

      <!-- Logout Icon -->
      <button
        @click.stop="auth.logout()"
        title="Logout"
        class="text-gray-500 hover:text-[#1f6fb6] ml-auto"
      >
        <Icon icon="mdi:logout" class="w-5 h-5" />
      </button>
    </div>
  </aside>
</template>
