<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "../stores/auth";

const auth = useAuth();
const menuOpen = ref(false); // toggle dropdown visibility

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const username = auth.user?.tenantId || auth.user?.username || "User";

// ✅ Just call logout (it already redirects in the store)
const handleLogout = () => {
  auth.logout();
  menuOpen.value = false;
};
</script>

<template>
  <div class="relative inline-block text-left">
    <!-- Button area -->
    <button
      @click="toggleMenu"
      class="flex items-center gap-2 text-[#1f6fb6] font-semibold hover:text-[#155a9c]"
    >
      <!-- user icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z"
        />
      </svg>

      <span>{{ username }}</span>

      <!-- arrow -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-4 h-4 transition-transform"
        :class="{ 'rotate-180': menuOpen }"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div
      v-if="menuOpen"
      class="absolute right-0 mt-2 w-32 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
    >
      <button
        @click="handleLogout"
        class="block w-full text-center px-4 py-2 text-[#1f6fb6] font-semibold hover:bg-gray-50"
      >
        Logout
      </button>
    </div>
  </div>
</template>
