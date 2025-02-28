import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { useDeleteTask } from "@/hooks/useTaskQuery"
import { CircleX } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

export const TaskDelete = ({ task_id, setEnableEdit }: {
    task_id: string
    setEnableEdit: (state: boolean) => void
}) => {
    const queryClient = useQueryClient()
    const { deleteSpecificTask } = useDeleteTask()
    const [openDialog, setOpenDialog] = useState(false)

    function handleDeleteTask(id: string) {
        deleteSpecificTask.mutateAsync(id, {
            onSuccess: (data) => {
                const { message } = data
                // console.log(message)
                queryClient.invalidateQueries({ queryKey: ['my_tasks'] })
                setOpenDialog(false)    /* Close dialog */
                setEnableEdit(false)    /* Disables edit */
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
                <DialogTrigger asChild>
                    <CircleX size={'20px'}/>
                </DialogTrigger>

                <DialogContent className="w-fit">
                    <DialogHeader>
                        <DialogTitle>
                            Are you sure you want to delete this?
                        </DialogTitle>
                        <DialogDescription className="py-4">
                            This action is cannot be undone
                        </DialogDescription>
                        <div className="flex space-x-2 justify-end">
                            <Button onClick={() => handleDeleteTask(task_id)}>Yes</Button>
                            <DialogClose asChild>
                                <Button type="button" variant={'destructive'}>Cancel</Button>
                            </DialogClose>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
