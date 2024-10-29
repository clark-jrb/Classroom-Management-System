import { create } from "zustand"

type AuthStore = {
    accessToken: string,
    refreshToken: string,
    role: string,
    user_id: string,
    setRole: (newRole: string) => void,
    setUserId: (newUserId: string) => void,
    setAccessToken: (newAccessToken: string) => void,
    setRefreshToken: (newRefreshToken: string) => void,
}

export const useAuthStore = create<AuthStore>((set) => ({
    accessToken: "",
    refreshToken: "",
    role: "",
    user_id: "",
    setRole: (newRole) => set({ role: newRole }),
    setUserId: (newUserId) => set({ user_id: newUserId }),
    setAccessToken: (newAccessToken) => set({ accessToken: newAccessToken }),
    setRefreshToken: (newRefreshToken) => set({ refreshToken: newRefreshToken })
}))