import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
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
import { teacherClassInfo } from "@/hooks/useTeacherQuery"
import { updateTaskSchema } from "@/schemas/task.schema"
import { TUpdateTask } from "@/types/task.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useUpdateTask } from "@/hooks/useTaskQuery"
import { useQueryClient } from "@tanstack/react-query"
import { getTaskChanges } from "@/helpers/changed-fields"
import { toast } from "sonner"
import { toCamelCase } from "@/helpers/camel-case"
import { LoaderCircle } from "lucide-react"
import { useEffect } from "react"

export const TaskUpdate = ({ task_id, task_data, openDialog, setOpenDialog } : {
    task_id: string
    task_data: TUpdateTask
    openDialog: boolean
    setOpenDialog: (state: boolean) => void
}) => {
    const queryClient = useQueryClient()
    const { subjects } = teacherClassInfo()
    const { updateSpecificTask } = useUpdateTask(task_id)

    const updateForm = useForm<TUpdateTask>({
        resolver: zodResolver(updateTaskSchema),
        defaultValues: task_data
    })

    // Reset form when task_data changes
    useEffect(() => {
        if (task_data) {
            updateForm.reset(task_data)
        }
    }, [task_data, updateForm])

    function onSubmit(values: TUpdateTask) {
        // console.log(values)
        const changed = getTaskChanges(task_data, values)
        if (!changed) {
            updateSpecificTask.mutateAsync(values, {
                onSuccess: (data) => {
                    const { message } = data
                    console.log(message)
                    queryClient.invalidateQueries({ queryKey: ['my_tasks'] })
                    setOpenDialog(false)    /* Close dialog */
                    toast.success(message)
                },
                onError: (error) => {
                    console.log(error)
                    toast.error('Error occured')
                }
            })
        } else {
            toast.warning('Nothing changed')
        }
    }

    function onError(errors: any) {
        console.log(errors)
        toast.error('Error occured')
    }

    return (
        <div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="w-[20rem]">
                    <DialogHeader className="space-y-4">
                        <DialogTitle className="font-medium">
                            <div className="text-xl text-navy pb-4 border-b border-light_navy leading-none">
                                Edit task
                            </div>
                        </DialogTitle>
                        <DialogDescription>
                            Make changes to the task.
                        </DialogDescription>
                        
                    </DialogHeader>
                    {/* FORM STARTS HERE */}
                    <Form {...updateForm}>
                        <form onSubmit={updateForm.handleSubmit(onSubmit, onError)} className="space-y-4">
                            {/* Subject  */}
                            <FormField
                                control={updateForm.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-500">Subject:</FormLabel>
                                        <FormControl>
                                            <Select 
                                                onValueChange={(value) => {
                                                    field.onChange(value)
                                                }} 
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="p-6">
                                                        <SelectValue placeholder="Select your subject" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {subjects.map((data, index) => (
                                                        <SelectItem key={index} value={data}>{toCamelCase(data)}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            {/* Task Number  */}
                            <FormField
                                control={updateForm.control}
                                name="task_no"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-500">Task Number:</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="number"
                                                className="p-6"
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
                            {/* Total Items  */}
                            <FormField
                                control={updateForm.control}
                                name="total_items"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-500">Total items:</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="number"
                                                className="p-6"
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
                            <DialogFooter className="pt-4">
                                <Button 
                                    variant={'navy'}
                                    type="submit"
                                    disabled={updateSpecificTask.isPending}
                                >
                                    {updateSpecificTask.isPending 
                                        ? <LoaderCircle className="animate-spin" color="white"/> 
                                        : "Save changes"
                                    }
                                </Button>
                                <DialogClose asChild>
                                    <Button 
                                        type="button" 
                                        variant={'ghost'}
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
