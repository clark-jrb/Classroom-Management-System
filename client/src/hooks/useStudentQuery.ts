import { useAuthStore } from "@/stores/auth/authSlice"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getStudentInformation } from "@/services/UserService"
import { getStudentQAs } from "@/services/StudentService"
import { getStudentGA } from "@/services/TaskService"

/**
 * Custom hook to fetch student's data
 * (includes: account, profile, class)
 */
export const useStudentData = () => {
    const { user_id } = useAuthStore()

    return useSuspenseQuery({
        queryKey: ['student_data', user_id],
        queryFn: () => getStudentInformation(user_id)
    })
}

/**
 * Custom hook to fetch student's quarterly averages (quarter 1 to 4)
 * to be displayed on grades table
 */
export const useStudentQAs = (sid: string) => {
    return useSuspenseQuery({
        queryKey: ['student_qas', sid],
        queryFn: () => getStudentQAs(sid)
    })
}

/**
 * Custom hook to fetch student's general average
 * to be displayed on grades table
 */
export const useStudentGA = (sid: string) => {
    return useSuspenseQuery({
        queryKey: ['my_general_average', sid],
        queryFn: () => getStudentGA(sid)
    })
}