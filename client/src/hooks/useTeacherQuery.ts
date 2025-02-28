import { useAuthStore } from "@/stores/auth/authSlice"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getTeacherInformation } from "@/services/UserService"
import { getMyStudents } from "@/services/TeacherService"

/**
 * Custom hook that returns teacher class information
 */
export const teacherClassInfo = () => {
    const { data } = useTeacherData()

    /** Destructure classes from teacher's data */
    const { teacher_role, grade_assigned, section_handled, subjects } = data.classes

    return { teacher_role, grade_assigned, section_handled, subjects }
}

/**
 * Custom hook to fetch teacher's data
 */
export const useTeacherData = () => {
    const { user_id } = useAuthStore()

    return useSuspenseQuery({
        queryKey: ['faculty_data', user_id],
        queryFn: () => getTeacherInformation(user_id)
    })
}

/**
 * Custom hook to fetch teacher's students with information
 */
export const useMyStudentsData = (grade_assigned: string, section: string) => {
    return useSuspenseQuery({
        queryKey: ['my_students', grade_assigned, section],
        queryFn: () => getMyStudents(grade_assigned, section)
    })
}