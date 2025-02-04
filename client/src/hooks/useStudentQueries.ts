import { useAuthStore } from "@/stores/auth/authSlice"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { getStudentInformation } from "@/services/UserService"
import { getStudentGPAs, updateStudentInfo } from "@/services/StudentService"
import { useStudentDialogStore } from "@/stores/studentSlice"

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

            openDialog(false) // close dialog
        },
        onError: (error) => {
            console.log(error)
        }
    })
    
    return { updateProfile }
}

export const useStudentGPAs = (sid: string) => {
    return useSuspenseQuery({
        queryKey: ['student_gpas', sid],
        queryFn: () => getStudentGPAs(sid)
    })
}

export const useStudentData = () => {
    const { user_id } = useAuthStore()

    return useSuspenseQuery({
        queryKey: ['student_data', user_id],
        queryFn: () => getStudentInformation(user_id)
    })
} 