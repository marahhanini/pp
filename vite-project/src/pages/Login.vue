<script setup>
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../stores/auth";
const router = useRouter();
const auth = useAuth();

const form = reactive({ tenantId: "", username: "", password: "" });
const canSubmit = computed(() => form.tenantId && form.username && form.password && !auth.loading);

const submit = async () => {
  await auth.login(form);
  if (auth.isAuthenticated) router.push("/");
};
</script>

<template>
  <!-- full screen center; body already has the beige background -->
  <main class="min-h-screen grid place-items-center">
    <section
      class="relative w-[560px] max-w-[92vw] rounded-2xl bg-white p-10 shadow-[0_12px_30px_rgba(0,0,0,.08)]"
    >
      <h1 class="text-[40px] font-extrabold text-[#164e91] text-center">Login</h1>
      <p class="text-[12px] tracking-wide text-[#164e91]/70 mb-6 text-center">
        ENTER YOUR DETAILS BELOW TO CONTINUE
      </p>

      <form @submit.prevent="submit" class="space-y-5">
        <div>
          <label for="tenant" class="sr-only">Tenant ID</label>
          <input
            id="tenant"
            v-model="form.tenantId"
            placeholder="Tenant ID"
            class="w-full border-0 border-b-2 border-[#d9d9d9] focus:border-[#2d6bbb] focus:outline-none py-2 text-[15px]"
            type="text"
          />
        </div>

        <div>
          <label for="username" class="sr-only">Username</label>
          <input
            id="username"
            v-model="form.username"
            placeholder="Username"
            class="w-full border-0 border-b-2 border-[#e6e6e6] focus:border-[#2d6bbb] focus:outline-none py-2 text-[15px]"
            type="text"
          />
        </div>

        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            v-model="form.password"
            placeholder="Password"
            class="w-full border-0 border-b-2 border-[#e6e6e6] focus:border-[#2d6bbb] focus:outline-none py-2 text-[15px]"
            type="password"
          />
        </div>

        <button
          class="w-full h-10 rounded border border-[#2d6bbb] text-[#2d6bbb] font-medium hover:bg-[#e9f1fb] disabled:opacity-50"
          type="submit"
          :disabled="!canSubmit"
        >
          {{ auth.loading ? "Signing in…" : "LOG IN" }}
        </button>

        <p v-if="auth.error" class="text-red-600 text-sm">{{ auth.error }}</p>

        <div class="pt-4 text-[12px] text-center">
          <a href="#" class="text-[#2d6bbb] hover:underline">CONTACT SUPPORT</a>
        </div>
      </form>
      <img src="/flowless.png" alt="flowless" class="absolute right-8 bottom-6 h-12" />
    </section>
  </main>
</template>
