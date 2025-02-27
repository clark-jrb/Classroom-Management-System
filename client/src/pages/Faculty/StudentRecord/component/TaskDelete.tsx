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
import { useDeleteTask } from "@/hooks/useTaskQueries"
import { CircleX } from "lucide-react"

export const TaskDelete = ({ task_id }: {
    task_id: string
}) => {
    const { deleteSpecificTask } = useDeleteTask()

    function handleDeleteTask(id: string) {
        deleteSpecificTask.mutateAsync(id, {
            onSuccess: (data) => {
                const { message } = data
                console.log(message)
            },
            onError: (error) => {
                console.log(error)
            }
        })
    }

    return (
        <div>
            <Dialog>
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
