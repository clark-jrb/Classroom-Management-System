import { useAuthStore } from "@/stores/auth/authSlice"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { getStudentInformation } from "@/services/UserService"
import { getStudentGPAs, updateStudentInfo } from "@/services/StudentService"
import { useStudentDialogStore } from "@/stores/studentSlice"

// this is where the student queries 
export const useStudentQueries = () => {
    const queryClient = useQueryClient()
    const { user_id } = useAuthStore()
    const { openDialog } = useStudentDialogStore()

    // get student informations (account, personal, classes)
    const getStudentData = useSuspenseQuery({
        queryKey: ['student_data', user_id],
        queryFn: () => getStudentInformation(user_id),
        // enabled: !!user_id,
    })

    if (getStudentData.isError) console.log('there is an error: ' + getStudentData.error) 

    const studentData = getStudentData.data

    // student update information
    const updatePersonal = useMutation({
        mutationFn: (value: Record<string, any>) => updateStudentInfo(user_id, value), // post in the api
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['student_data', user_id] }) // refetch data
            // console.log('success on hook')
            openDialog(false) // close dialog
        },
        onError: (error) => {
            console.log(error)
        }
    })
    
    return { studentData, updatePersonal }
}

export const useStudentGPAs = (sid: string) => {
    return useSuspenseQuery({
        queryKey: ['student_gpas', sid],
        queryFn: () => getStudentGPAs(sid)
    })
}