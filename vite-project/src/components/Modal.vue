<template>
  <teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 bg-[#eaf2f9]/70 flex items-center justify-center z-50"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-xl shadow-lg w-[90%] max-w-4xl p-6 relative animate-fadeIn">
        <button
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          @click="$emit('close')"
        >
          ✕
        </button>

        <!-- 🧩 Slot for chart or details -->
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
defineProps({
  visible: Boolean,
});
defineEmits(["close"]);
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
