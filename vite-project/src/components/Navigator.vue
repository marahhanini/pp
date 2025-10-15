<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../stores/auth";
import type { MenuItem } from "../types/menu";
import SubMenu from "./SubMenu.vue";

const router = useRouter();
const auth = useAuth();

const emit = defineEmits(["closeSidebar", "toggleCollapse"]);
const props = defineProps<{ collapsed: boolean }>();
const isMobile = ref(false);
const onNavigate = () => {
  if (isMobile.value) {
    // let RouterLink start navigation first; close the drawer right after
    setTimeout(() => emit("closeSidebar"), 0);
  }
};

const handleResize = () => {
  isMobile.value = window.innerWidth < 1024;
};
const isCollapsed = computed(() => props.collapsed && !isMobile.value);

const items = ref<MenuItem[]>([
  { name: "dashboard", label: "Dashboard", to: "/", icon: "mdi:view-dashboard-outline" },
  { name: "water", label: "Water Quality", to: "/water", icon: "mdi:water-outline" },
  {
    name: "control",
    label: "Control center",
    icon: "mdi:tune-vertical",
    to: "/control", // ✅ allows navigation when clicked
    subPage: [
      { name: "pumps", label: "Pumps", to: "/control/pumps" },
      { name: "valves", label: "Valves", to: "/control/valves" },
    ],
  },
  {
    name: "epanet",
    label: "Epanet Demo",
    icon: "mdi:map-outline",
    to: "/epanet",
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
    to: "/alerts",
    subPage: [
      { name: "new", label: "New", to: "/alerts/new" },
      { name: "history", label: "History", to: "/alerts/history" },
    ],
  },
  { name: "zones", label: "Zones", icon: "bx:shape-square", to: "/zones" },
  { name: "monitor", label: "Monitoring", icon: "mdi:monitor-dashboard", to: "/monitoring" },
  { name: "reports", label: "Reports", icon: "mdi:clipboard-text-outline", to: "/reports" },
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

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const handleLogout = () => auth.logout();
</script>

<template>
  <div class="sidebar font-sans text-[15px] text-gray-800 flex flex-col h-full overflow-hidden">
    <!-- ✅ Header (aligned correctly) -->
    <div class="flex items-center justify-between px-4 py-3">
      <!-- Brand always visible; text only when not collapsed -->
      <div class="flex items-center gap-2">
        <img src="/flowless.png" alt="flowless" class="h-8 w-8 md:h-9 md:w-9 shrink-0" />
        <span
          v-show="!isCollapsed"
          class="hidden md:inline text-[22px] font-semibold text-[#1f6fb6] tracking-tight"
        >
          flowless
        </span>
      </div>

      <!-- Desktop collapse chevron -->
      <button
        v-if="!isMobile"
        class="ml-auto text-gray-500 hover:text-gray-700"
        @click="$emit('toggleCollapse')"
        :title="isCollapsed ? 'Expand' : 'Collapse'"
      >
        <span class="text-xl">{{ isCollapsed ? "»" : "«" }}</span>
      </button>

      <!-- Mobile close button -->
      <button
        v-else
        @click="$emit('closeSidebar')"
        class="text-gray-500 hover:text-gray-700 text-xl"
        title="Close"
      >
        <Icon icon="mdi:close" class="w-6 h-6" />
      </button>
    </div>

    <!-- ✅ Menu -->
    <nav class="min-h-0 grow overflow-y-auto px-3 py-4">
      <ul class="space-y-[4px]">
        <li
          v-for="item in items"
          :key="item.name"
          class="bg-white hover:bg-gray-50 transition-all duration-200 rounded-md cursor-pointer"
          :class="{ 'justify-center': isCollapsed }"
        >
          <SubMenu :item="item" :collapsed="isCollapsed" @navigate="onNavigate" />
        </li>
      </ul>
    </nav>

    <!-- ✅ Footer -->
    <div
      class="px-4 py-3 border-t border-gray-200 bg-white flex items-center justify-between transition-all duration-300"
      :class="{ 'justify-center': isCollapsed }"
    >
      <div
        class="h-10 w-10 rounded-full bg-[#e9f1fb] grid place-items-center text-[#2d6bbb] font-semibold"
      >
        FR
      </div>

      <div v-if="!isCollapsed" class="flex flex-col ml-3">
        <div class="font-semibold leading-tight">Front end</div>
        <div class="text-sm text-gray-500 leading-tight">Front end</div>
      </div>

      <button
        @click.stop="auth.logout()"
        title="Logout"
        class="text-gray-500 hover:text-[#1f6fb6] ml-auto"
      >
        <Icon icon="mdi:logout" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.sidebar::-webkit-scrollbar {
  width: 6px;
}
.sidebar::-webkit-scrollbar-thumb {
  background-color: #d3d3d3;
  border-radius: 4px;
}
.sidebar::-webkit-scrollbar-thumb:hover {
  background-color: #bfbfbf;
}
</style>
