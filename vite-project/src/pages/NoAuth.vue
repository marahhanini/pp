<template>
  <main class="h-screen grid place-items-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-red-600">Access Denied</h1>
      <p class="text-gray-600 mt-2">You do not have permission to view this page.</p>
      <RouterLink to="/login" class="inline-block mt-4 text-[#1f6fb6] hover:underline">
        🔐 Go to Login
      </RouterLink>
    </div>
  </main>
</template>
