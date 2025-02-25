import { useAuthStore } from "@/stores/auth/authSlice"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getTeacherInformation } from "@/services/UserService"
import { getMyStudents } from "@/services/TeacherService"

export const teacherInfo = () => {
    const { data } = useTeacherData()

    // destructure data from the api
    const { teacher_role, grade_assigned, section_handled, subjects } = data.classes
    // const { email } = account || {}
    // const { firstname, middlename, lastname, sex, contact, birth_date } = profile || {}

    return { teacher_role, grade_assigned, section_handled, subjects }
}

export const useTeacherData = () => {
    const { user_id } = useAuthStore()

    return useSuspenseQuery({
        queryKey: ['faculty_data', user_id],
        queryFn: () => getTeacherInformation(user_id)
    })
}

export const useMyStudentsData = (grade_assigned: string, section: string) => {
    return useSuspenseQuery({
        queryKey: ['my_students', grade_assigned, section],
        queryFn: () => getMyStudents(grade_assigned, section)
    })
}