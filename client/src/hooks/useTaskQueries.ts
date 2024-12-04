import { useAuthStore } from "@/stores/auth/authSlice"
import { useMutation } from "@tanstack/react-query"
import { createTask } from "@/services/TaskService"
import { useTaskDialogStore } from "@/stores/taskSlice"

export const taskFunctions = () => {
    const { user_id } = useAuthStore()
    const { openDialog } = useTaskDialogStore()
    
    const generateTask = useMutation({
        mutationFn: (value: Record<string, any>) => createTask(user_id, value), 
        onSuccess: (data) => {
            const { message } = data
            openDialog(false)
            console.log(message)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return { generateTask }
}