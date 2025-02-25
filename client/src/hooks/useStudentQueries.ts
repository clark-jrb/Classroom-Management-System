import { useAuthStore } from "@/stores/auth/authSlice"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { getStudentInformation } from "@/services/UserService"
import { getStudentQAs, updateStudentProfile } from "@/services/StudentService"
import { useStudentDialogStore } from "@/stores/studentSlice"
import { useToastStore } from "@/stores/toastStore"
import { getStudentGA } from "@/services/TaskService"
import { updateTeacherProfile } from "@/services/TeacherService"
import { Message } from "@/types/GlobalTypes"

// this is where the student queries 
export const useProfileMutation = () => {
    const queryClient = useQueryClient()
    const { user_id, role } = useAuthStore()
    const { openDialog } = useStudentDialogStore()

    const selectAPIFunction = (
        role: string, 
        value: Record<string, any>
    ): Promise<Message> => {
        const selected = {
            student: updateStudentProfile,
            faculty: updateTeacherProfile
        }

        return selected[role as keyof typeof selected](user_id, value)
    }

    const selectData = (role: string) => {
        const selected = {
            student: 'student_data',
            faculty: 'faculty_data'
        }

        return selected[role as keyof typeof selected]
    }

    // student update information
    const updateProfile = useMutation({
        mutationFn: (value: Record<string, any>) => selectAPIFunction(role, value), // post in the api
        onSuccess: (data) => {
            const { message } = data
            console.log(message)
            queryClient.invalidateQueries({ queryKey: [selectData(role), user_id] }) // refetch data
            useToastStore.getState().setToast(message, 'success')

            openDialog(false) // close dialog
        },
        onError: (error) => {
            console.log(error)
            useToastStore.getState().setToast(error?.message, 'error')
        }
    })
    
    return { updateProfile }
}

export const useStudentQAs = (sid: string) => {
    return useSuspenseQuery({
        queryKey: ['student_qas', sid],
        queryFn: () => getStudentQAs(sid)
    })
}

export const useStudentData = () => {
    const { user_id } = useAuthStore()

    return useSuspenseQuery({
        queryKey: ['student_data', user_id],
        queryFn: () => getStudentInformation(user_id)
    })
} 

export const useStudentGA = (sid: string) => {
    return useSuspenseQuery({
        queryKey: ['my_general_average', sid],
        queryFn: () => getStudentGA(sid)
    })
}