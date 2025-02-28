import { updateStudentProfile } from "@/services/StudentService"
import { updateTeacherProfile } from "@/services/TeacherService"
import { getCurrentUser } from "@/services/UserService"
import { useAuthStore } from "@/stores/auth/authSlice"
import { useStudentDialogStore } from "@/stores/studentSlice"
import { useToastStore } from "@/stores/toastStore"
import { Message, Roles } from "@/types/global.types"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"

/**
 * Custom hook to fetch current user on the server
 */
export const useCurrentUser = () => {
    return useSuspenseQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
    })
}

/**
 * Custom hook to mutate/update user's profile
 */
export const useProfileMutation = () => {
    const queryClient = useQueryClient()
    const { user_id, role } = useAuthStore()
    const { openDialog } = useStudentDialogStore()

    /** 
     * Mutation method from tanstack query to update profile 
     */
    const updateProfile = useMutation({
        mutationFn: (value: Record<string, any>) => selectAPIFunction(role, value),
        onSuccess: (data) => {
            const { message } = data
            console.log(message)
            queryClient.invalidateQueries({ queryKey: [selectKey(role), user_id] }) /* Re-fetch data */
            useToastStore.getState().setToast(message, 'success')

            openDialog(false)   /* Close dialog */
        },
        onError: (error) => {
            console.log(error)
            useToastStore.getState().setToast(error?.message, 'error')
        }
    })
    
    /* Function to select mutation function by role */
    const selectAPIFunction = (
        role: Roles | "", 
        values: Record<string, any>
    ): Promise<Message> => {
        const selected = {
            student: updateStudentProfile,
            faculty: updateTeacherProfile
        }

        return selected[role as keyof typeof selected](user_id, values)
    }

    /* Function to select 'query key' to be refetch after the updateProfile function */
    const selectKey = (role: Roles | "") => {
        const selected = {
            student: 'student_data',
            faculty: 'faculty_data'
        }

        return selected[role as keyof typeof selected]
    }

    
    return { updateProfile }
}