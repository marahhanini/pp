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
  <div class="flex h-screen overflow-hidden bg-gray-50">
    <Sidebar />
    <main class="flex-1 overflow-y-auto p-6 bg-gray-50">
      <RouterView />
    </main>
  </div>
</template>
