import { create } from "zustand"

type AuthStore = {
    accessTokenC: string,
    refreshToken: string,
    role: string,
    setRole: (newRole: string) => void,
    setAccessToken: (newAccessToken: string) => void,
    setRefreshToken: (newRefreshToken: string) => void,
}

export const useAuthStore = create<AuthStore>((set) => ({
    accessTokenC: "",
    refreshToken: "",
    role: "",
    setRole: (newRole) => set({ role: newRole }),
    setAccessToken: (newAccessToken) => set({ accessTokenC: newAccessToken }),
    setRefreshToken: (newRefreshToken) => set({ role: newRefreshToken })
}))