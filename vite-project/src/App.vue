<!-- src/App.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import Sidebar from "./components/Navigator.vue";

const route = useRoute();
const isLogin = computed(() => route.path === "/login");
</script>

<template>
  <!-- If on /login: show only the login page -->
  <RouterView v-if="isLogin" />

  <!-- Else: show app layout with sidebar -->
  <div v-else class="min-h-screen flex bg-[#f4f2f0]">
    <Sidebar />
    <main class="flex-1 min-h-screen overflow-auto">
      <RouterView />
    </main>
  </div>
</template>
