import { useAuthStore } from "@/stores/auth/authSlice"
import { useMutation } from "@tanstack/react-query"
import { createTask } from "@/services/TaskService"

export const taskFunctions = () => {
    const { user_id } = useAuthStore()
    
    const generateTask = useMutation({
        mutationFn: (value: Record<string, any>) => createTask(user_id, value)
    })

    return { generateTask }
}