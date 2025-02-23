import { useAuthStore } from "@/stores/auth/authSlice"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { getStudentInformation } from "@/services/UserService"
import { getStudentQAs, updateStudentInfo } from "@/services/StudentService"
import { useStudentDialogStore } from "@/stores/studentSlice"
import { useToastStore } from "@/stores/toastStore"
useToastStore

// this is where the student queries 
export const useProfileMutation = () => {
    const queryClient = useQueryClient()
    const { user_id } = useAuthStore()
    const { openDialog } = useStudentDialogStore()

    // student update information
    const updateProfile = useMutation({
        mutationFn: (value: Record<string, any>) => updateStudentInfo(user_id, value), // post in the api
        onSuccess: (data) => {
            const { message } = data
            console.log(message)
            queryClient.invalidateQueries({ queryKey: ['student_data', user_id] }) // refetch data
            useToastStore.getState().setToast(message, 'success')

            openDialog(false) // close dialog
        },
        onError: (error) => {
            console.log(error)
            useToastStore.getState().setToast(error?.message, 'success')
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