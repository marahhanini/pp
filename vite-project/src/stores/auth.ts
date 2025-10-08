import { defineStore } from "pinia";
import router from "../router";

export const useAuth = defineStore("auth", {
  state: () => ({
    // ✅ Restore session from localStorage on load
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user") || "null"),
    loading: false,
    error: null as string | null,
  }),

  getters: {
    // ✅ Computed flag to check login status
    isAuthenticated: (s) => !!s.token,
  },

  actions: {
    // ✅ Simulated login logic
    async login({
      tenantId,
      username,
      password,
    }: {
      tenantId: string;
      username: string;
      password: string;
    }) {
      this.error = null;
      this.loading = true;

      try {
        // Simulate API call
        await new Promise((r) => setTimeout(r, 700));

        if (!tenantId || !username || !password) {
          throw new Error("All fields are required");
        }

        // ✅ Mock token for now
        this.token = "demo-token";
        this.user = { tenantId, username };

        // ✅ Persist login session
        localStorage.setItem("token", this.token);
        localStorage.setItem("user", JSON.stringify(this.user));

        // ✅ Redirect to dashboard (not root)
        router.push("/dashboard");
      } catch (e: any) {
        this.error = e.message || "Login failed";
        this.token = null;
        this.user = null;
      } finally {
        this.loading = false;
      }
    },

    // ✅ Central logout
    logout() {
      this.token = null;
      this.user = null;

      // ✅ Clear localStorage session
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // ✅ Redirect to login (always safe)
      if (router.currentRoute.value.path !== "/login") {
        router.push("/login");
      }
    },
  },
});
