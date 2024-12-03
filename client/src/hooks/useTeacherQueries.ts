import { useAuthStore } from "@/stores/auth/authSlice"
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { getTeacherInformation } from "@/services/UserService"


export const teacherInfo = () => {
    const { user_id } = useAuthStore()

    const getTeacherData = useSuspenseQuery({
        queryKey: ['teacher_data', user_id],
        queryFn: () => getTeacherInformation(user_id),
        // enabled: !!user_id,
    })

    if (getTeacherData.isLoading) {
        console.log('loading teacher data...')
    }

    if (getTeacherData.isError) {
        console.log(getTeacherData.error)
    }

    // destructure data from the api
    const { classes } = getTeacherData.data
    const { teacher_role, grade_assigned, section_handled, subjects } = classes
    // const { email } = account || {}
    // const { firstname, middlename, lastname, sex, contact, birth_date } = personal || {}

    return { teacher_role, grade_assigned, section_handled, subjects }
}