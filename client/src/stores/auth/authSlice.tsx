import { create } from "zustand"

type AuthStore = {
    accessToken: string,
    refreshToken: string,
    role: string,
    setRole: (newRole: string) => void,
    setAccessToken: (newAccessToken: string) => void,
    setRefreshToken: (newRefreshToken: string) => void,
}

export const useAuthStore = create<AuthStore>((set) => ({
    accessToken: "",
    refreshToken: "",
    role: "",
    setRole: (newRole) => set({ role: newRole }),
    setAccessToken: (newAccessToken) => set({ accessToken: newAccessToken }),
    setRefreshToken: (newRefreshToken) => set({ refreshToken: newRefreshToken })
}))