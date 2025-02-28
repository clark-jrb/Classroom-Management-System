import { create } from "zustand"
import { Roles } from "@/types/GlobalTypes"

type AuthStore = {
    role: Roles | ""
    user_id: string
    setRole: (newRole: Roles | "") => void
    setUserId: (newUserId: string) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    role: "",
    user_id: "",
    setRole: (value) => set({ role: value }),
    setUserId: (value) => set({ user_id: value })
}))

type TeacherStore = {
    teacher_role: string
    setTeacherRole: (value: string) => void,
}

export const useTeacherStore = create<TeacherStore>((set) => ({
    teacher_role: "",
    setTeacherRole: (value) => set({ teacher_role: value })
}))