import { create } from "zustand"

type AuthStore = {
    role: string,
    user_id: string,
    setRole: (newRole: string) => void,
    setUserId: (newUserId: string) => void,
}

export const useAuthStore = create<AuthStore>((set) => ({
    role: "",
    user_id: "",
    setRole: (newRole) => set({ role: newRole }),
    setUserId: (newUserId) => set({ user_id: newUserId })
}))