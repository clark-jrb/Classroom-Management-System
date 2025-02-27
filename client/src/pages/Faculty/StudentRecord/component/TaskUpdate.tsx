import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { teacherClassInfo } from "@/hooks/useTeacherQueries"
import { updateTaskSchema } from "@/schemas/teacherSchemas"
import { TUpdateTask } from "@/types/GlobalTypes"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useUpdateTask } from "@/hooks/useTaskQueries"
import { useQueryClient } from "@tanstack/react-query"
import { getTaskChanges } from "@/helpers/changed-fields"
import { toast } from "sonner"

export const TaskUpdate = ({ task_id, task_data } : {
    task_id: string
    task_data: TUpdateTask
}) => {
    const queryClient = useQueryClient()
    const { subjects } = teacherClassInfo()
    const [openDialog, setOpenDialog] = useState(false)
    const { updateSpecificTask } = useUpdateTask(task_id)

    const updateForm = useForm<TUpdateTask>({
        resolver: zodResolver(updateTaskSchema),
        defaultValues: task_data
    })

    function onSubmit(values: TUpdateTask) {
        // console.log(values)
        const changed = getTaskChanges(task_data, values)
        if (!changed) {
            updateSpecificTask.mutateAsync(values, {
                onSuccess: (data) => {
                    const { message } = data
                    console.log(message)
                    queryClient.invalidateQueries({ queryKey: ['my_tasks'] })
                    setOpenDialog(false)
                    toast.success(message)
                },
                onError: (error) => {
                    console.log(error)
                    toast.error('Error occured')
                }
            })
        } else {
            toast.warning('Nothing changes')
        }
    }

    function onError(errors: any) {
        console.log(errors)
        toast.error('Error occured')
    }

    return (
        <div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                    <Pencil size={'20px'}/>
                </DialogTrigger>

                <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>Update task</DialogTitle>
                        <DialogDescription>update the task</DialogDescription>
                        
                    </DialogHeader>
                    {/* FORM STARTS HERE */}
                    <Form {...updateForm}>
                        <form onSubmit={updateForm.handleSubmit(onSubmit, onError)} className="space-y-4">
                            <FormField
                                control={updateForm.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subject:</FormLabel>
                                        <FormControl>
                                            <Select 
                                                onValueChange={(value) => {
                                                    field.onChange(value)
                                                }} 
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your subject" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {subjects.map((data, index) => (
                                                        <SelectItem key={index} value={data}>{data}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={updateForm.control}
                                name="total_items"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Total items:</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="number"
                                                placeholder="total items of the task"
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                value={field.value}
                                                min={5}
                                                max={100}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={updateForm.control}
                                name="task_no"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Task Number:</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="number"
                                                placeholder="Task number"
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                value={field.value}
                                                min={1}
                                                max={10}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <DialogFooter className="pt-4">
                                <Button type="submit">
                                    Update
                                </Button>
                                <DialogClose asChild>
                                    <Button 
                                        type="button" 
                                        variant={'destructive'}
                                        onClick={() => {
                                            updateForm.reset()
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
            
        </div>
    )
}
