import { create } from "zustand"

export const roleStore = create((set) => ({
    role: "",
    setRole: (newRole: string) => set({ role: newRole })
}))