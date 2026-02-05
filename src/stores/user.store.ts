import { create } from "zustand";

type User = {
  userId: number;
};

type AuthStore = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  accessToken: null,
  user: null,
  setAuth: (user, accessToken) =>
    set({ accessToken, user, isAuthenticated: true }),
  clearAuth: () =>
    set({ user: null, isAuthenticated: false, accessToken: null }),
}));
