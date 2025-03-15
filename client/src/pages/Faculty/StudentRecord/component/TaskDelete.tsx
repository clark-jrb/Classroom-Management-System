import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { useDeleteTask } from "@/hooks/useTaskQuery"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const TaskDelete = ({ task_id, openDialog, setOpenDialog }: {
    task_id: string
    openDialog: boolean
    setOpenDialog: (state: boolean) => void
}) => {
    const queryClient = useQueryClient()
    const { deleteSpecificTask } = useDeleteTask()

    function handleDeleteTask(id: string) {
        deleteSpecificTask.mutateAsync(id, {
            onSuccess: (data) => {
                const { message } = data
                // console.log(message)
                queryClient.invalidateQueries({ queryKey: ['my_tasks'] })
                setOpenDialog(false)    /* Close dialog */
                toast.success(message)
            },
            onError: (error) => {
                console.log(error)
                toast.error('Error occured')
            }
        })
    }

    return (
        <div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>

                <DialogContent className="w-fit">
                    <DialogHeader>
                        <DialogTitle>
                            Are you sure you want to delete this?
                        </DialogTitle>
                        <DialogDescription className="py-4">
                            This action is cannot be undone
                        </DialogDescription>
                        <div className="flex space-x-2 justify-end">
                            {task_id && 
                                <Button onClick={() => handleDeleteTask(task_id)}>Yes</Button>
                            }
                            <DialogClose asChild>
                                <Button 
                                    type="button" 
                                    variant={'destructive'}
                                >Cancel</Button>
                            </DialogClose>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
