<template>
  <transition name="slide">
    <div
      v-if="visible"
      class="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl border-l border-gray-200 z-50 p-6 overflow-y-auto"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-[#1f6fb6]">
          {{ asset?.label || "Asset Details" }}
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 text-xl font-bold">
          ×
        </button>
      </div>

      <div v-if="asset">
        <p><b>ID:</b> {{ asset.id }}</p>
        <p><b>Category:</b> {{ asset.category }}</p>
        <p><b>Model:</b> {{ asset.model }}</p>
        <p><b>Manufacturer:</b> {{ asset.manufacturer }}</p>
        <p><b>Serial:</b> {{ asset.serial }}</p>
        <p>
          <b>Status:</b>
          <span :class="asset.is_active ? 'text-green-600' : 'text-red-600'">
            {{ asset.is_active ? "Active" : "Inactive" }}
          </span>
        </p>
        <p><b>Notes:</b> {{ asset.notes }}</p>

        <hr class="my-4" />

        <div class="space-y-2">
          <button
            class="w-full py-2 rounded-md bg-[#1f6fb6] text-white hover:bg-[#155a8a] transition"
          >
            View Readings
          </button>
          <button
            class="w-full py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition"
          >
            Maintenance Log
          </button>
        </div>
      </div>

      <div v-else class="text-gray-500 text-sm italic">No asset selected.</div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  visible: Boolean,
  asset: Object,
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
