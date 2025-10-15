<template>
  <!-- Full viewport, no stray vertical gap -->
  <div v-if="auth.isAuthenticated" class="flex h-[100dvh] bg-gray-50 overflow-hidden">
    <!-- Sidebar (single source of truth) -->
    <transition name="fade-slide">
      <aside
        v-if="sidebarOpen || isDesktop"
        class="border-r border-gray-200 bg-white h-full overflow-hidden transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-50 transform md:static md:translate-x-0"
        :class="[
          // width
          isDesktop ? (collapsed ? 'md:w-20' : 'md:w-64') : 'w-[85vw] max-w-sm', // <-- mobile drawer width
          // slide in/out on mobile
          isDesktop ? '' : sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        ]"
      >
        <Navigator
          :collapsed="collapsed"
          @toggleCollapse="toggleCollapse"
          @closeSidebar="closeSidebar"
        />
      </aside>
    </transition>

    <!-- Overlay for mobile -->
    <div
      v-if="sidebarOpen && !isDesktop"
      class="fixed inset-0 bg-black/40 z-40"
      @click="closeSidebar"
    />

    <!-- Main content (no left margins; flex handles the sidebar) -->
    <div class="flex-1 flex flex-col min-w-0 min-h-0 h-full overflow-hidden">
      <AppHeader @toggleSidebar="toggleSidebar" />
      <main class="flex-1 overflow-y-auto px-4 md:px-6 py-4 bg-gray-50">
        <RouterView />
      </main>
    </div>
  </div>

  <!-- When logged out -->
  <div v-else class="min-h-screen bg-gray-50">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import AppHeader from "./components/AppHeader.vue";
import Navigator from "./components/Navigator.vue";
import { useAuth } from "./stores/auth";

const auth = useAuth();

const sidebarOpen = ref(false);
const collapsed = ref(false);
const isDesktop = ref(window.innerWidth >= 1024);

const toggleSidebar = () => (sidebarOpen.value = !sidebarOpen.value);
const closeSidebar = () => (sidebarOpen.value = false);
const toggleCollapse = () => (collapsed.value = !collapsed.value);

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 1024;
  if (!isDesktop.value) {
    collapsed.value = false; // <-- force expanded on phones
  } else {
    sidebarOpen.value = false; // optional: close overlay when returning to desktop
  }
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
/* Sidebar slide-in/out */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.fade-slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
