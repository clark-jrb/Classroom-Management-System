import { deleteUser, getCurrentQuarter, getStudents, updateCurrentQuarter } from "@/services/AdminService"
import { CurrentQuarter, Roles } from "@/types/global.types"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useCurrentQuarter = () => {
    return useQuery({
        queryKey: ['current_quarter'],
        queryFn: () => getCurrentQuarter()
    })
}

export const useAdminMutations = () => {
    const quarterMutation = useMutation({
        mutationFn: ({ id, value }: {
            id: string, 
            value: CurrentQuarter
        }) => updateCurrentQuarter(id, value)
    })
    
    const deleteUserMutation = useMutation({
        mutationFn: ({ id, role }: {
            id: string
            role: Roles
        }) => deleteUser(id, role)
    })

    return { quarterMutation, deleteUserMutation }
}

export const useStudentsData = () => {
    return useQuery({
        queryKey: ['students'],
        queryFn: () => getStudents()
    })
}