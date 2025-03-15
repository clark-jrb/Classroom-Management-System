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
import { LoaderCircle } from "lucide-react"
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
                    <DialogHeader className="space-y-4">
                        <DialogTitle>
                            <div className="text-xl text-navy pb-4 border-b border-light_navy leading-none">
                                Are you sure you want to delete this?
                            </div>
                        </DialogTitle>
                        <DialogDescription>
                            This action is cannot be undone
                        </DialogDescription>
                        <div className="flex space-x-2 justify-end">
                            <Button 
                                variant={'destructive'}
                                onClick={() => handleDeleteTask(task_id)}
                                disabled={deleteSpecificTask.isPending}
                            >
                                {deleteSpecificTask.isPending 
                                    ? <LoaderCircle className="animate-spin" color="white"/> 
                                    : "Yes"
                                }
                            </Button>
                            <DialogClose asChild>
                                <Button 
                                    type="button" 
                                    variant={'ghost'}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
