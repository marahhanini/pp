import { defineStore } from "pinia";

export interface User {
  tenantId: string;
  username: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginPayload {
  tenantId: string;
  username: string;
  password: string;
}

export const useAuth = defineStore("auth", {
  state: (): AuthState => ({
    token: null,
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (s): boolean => !!s.token,
  },

  actions: {
    async login({ tenantId, username, password }: LoginPayload): Promise<void> {
      this.error = null;
      this.loading = true;
      try {
        // TODO: replace with real API call later
        await new Promise((r) => setTimeout(r, 700));
        if (!tenantId || !username || !password) {
          throw new Error("All fields required");
        }
        this.token = "demo-token";
        this.user = { tenantId, username };
      } catch (e: unknown) {
        this.error = e instanceof Error ? e.message : "Login failed";
        this.token = null;
        this.user = null;
      } finally {
        this.loading = false;
      }
    },

    logout(): void {
      this.token = null;
      this.user = null;
    },
  },
});
