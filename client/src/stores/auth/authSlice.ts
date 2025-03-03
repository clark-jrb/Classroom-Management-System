import { create } from "zustand"
import { Roles } from "@/types/global.types"
import { TeacherRole } from "@/types/teacher.types"

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
    teacher_role: "" | TeacherRole
    setTeacherRole: (value: "" | TeacherRole) => void,
}

export const useTeacherStore = create<TeacherStore>((set) => ({
    teacher_role: "",
    setTeacherRole: (value) => set({ teacher_role: value })
}))