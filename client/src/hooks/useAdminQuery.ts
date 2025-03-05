import { deleteStudent, getCurrentQuarter, getStudents, updateCurrentQuarter } from "@/services/AdminService"
import { CurrentQuarter } from "@/types/global.types"
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
    
    const deleteStudentMutation = useMutation({
        mutationFn: (id: string) => deleteStudent(id)
    })

    return { quarterMutation, deleteStudentMutation }
}

export const useStudentsData = () => {
    return useQuery({
        queryKey: ['students'],
        queryFn: () => getStudents()
    })
}