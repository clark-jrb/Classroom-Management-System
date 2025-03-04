import { getCurrentQuarter, updateCurrentQuarter } from "@/services/AdminService"
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

    return { quarterMutation }
}
