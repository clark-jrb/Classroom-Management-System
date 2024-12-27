import { useAuthStore } from "@/stores/auth/authSlice"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getTeacherInformation } from "@/services/UserService"

export const teacherInfo = () => {
    const { user_id } = useAuthStore()

    const { data, isLoading, isError, error } = useSuspenseQuery({
        queryKey: ['teacher_data', user_id],
        queryFn: () => getTeacherInformation(user_id),
    })

    if (isLoading) {
        console.log('loading teacher data...')
    }

    if (isError) {
        console.log(error)
    }

    // destructure data from the api
    const { teacher_role, grade_assigned, section_handled, subjects } = data.classes
    // const { email } = account || {}
    // const { firstname, middlename, lastname, sex, contact, birth_date } = personal || {}

    return { teacher_role, grade_assigned, section_handled, subjects }
}