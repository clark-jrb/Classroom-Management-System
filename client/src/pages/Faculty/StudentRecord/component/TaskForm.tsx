import {
    Dialog,
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
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { teacherClassInfo } from "@/hooks/useTeacherQuery"
import { useMemo, useState } from "react"
import { taskSchema } from "@/schemas/task.schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useTaskMutations, useMyTasks } from "@/hooks/useTaskQuery"
import { useQueryClient } from "@tanstack/react-query"
import { TaskTypes, SubjectTypes } from "@/types/global.types"
import { DialogClose } from "@radix-ui/react-dialog"
import { toast } from "sonner"
import { toCamelCase } from "@/helpers/camel-case"
import { Switch } from "@/components/ui/switch"
import { TTaskForm } from "@/types/task.types"
import { useCurrentQuarterStore } from "@/stores/globalSlice"


export const TaskForm = ({ taskType, enableEdit, setEnableEdit }: {
    taskType: TaskTypes
    enableEdit: boolean
    setEnableEdit: (state: boolean) => void
}) => {
    const { current_quarter } = useCurrentQuarterStore()
    const quarter = current_quarter     // QUARTER state (subject to change)
    const { generateTask, generateTasksToStudents } = useTaskMutations()    // mutation functions
    const { grade_assigned, section_handled, subjects } = teacherClassInfo()    // data from the hook
    const { countTask } = useMyTasks() 
    const [subject, setSubject] = useState<SubjectTypes | ''>('')   // SUBJECT state
    const [gradeLevel, setGradeLevel] = useState('')    // GRADE LEVEL state
    const [section, setSection] = useState('')  // SECTION state
    const [open, openDialog] = useState(false)  // DIALOG
    const queryClient = useQueryClient()
    const [formStep, setFormStep] = useState(1)

    const taskCount = useMemo(() => countTask(taskType, subject, section, quarter), [taskType, subject, section, quarter])  // COUNT existing tasks on database
    const taskLimit = handleTaskLimit(taskType)

    function handleTaskLimit(task: TaskTypes) {
        const select = {
            recitation: 10,
            activity: 10,
            quiz: 10,
            project: 5,
            summative: 1,
            exam: 1,
        }
        return select[task as keyof typeof select]
    }
    
    const taskForm = useForm<TTaskForm>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            subject: subject,
            grade: gradeLevel,
            section,
            type: taskType,
            total_items: 0,
            task_no: 0,
            quarter
        }
    })

    if (formStep === 4) {
        taskForm.setValue("task_no", taskCount + 1)
    }
    
    function onSubmit(values: TTaskForm) {
        // console.log(values)
        if (taskCount === taskLimit) {
            toast.warning(`${taskType} limit reached`)
        } else {
            generateTask.mutateAsync(values, {
                onSuccess: (data) => {
                    const { task } = data
                    openDialog(false)
    
                    generateTasksToStudents.mutateAsync({ 
                        task_id: task._id,
                        grade_lvl: gradeLevel,
                        section: section
                    })
    
                    taskForm.reset()
                    resetFormStates()
                    queryClient.invalidateQueries({ queryKey: ['my_tasks'] })
                    toast.success(`Succesfully created a ${taskType}`)
                },
                onError: (error) => {
                    console.log(error)
                    toast.error(`Failed to create a ${taskType}`)
                }
            })
        }
    }

    function onError(errors: any) { 
        // console.log("Form errors:", errors)
        if (errors) {
            setFormStep(4)
        }
    }

    function resetFormStates() {
        setFormStep(1)
        setGradeLevel('')
        setSection('')
        setSubject('')
    }

    return (
        <div className="flex space-x-4">
            <Dialog open={open} onOpenChange={openDialog}>
                <DialogTrigger asChild>
                    <Button variant={'navy'}>
                        Create record
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[525px]" onInteractOutside={(e) => e.preventDefault()}>
                        <DialogHeader>
                            <DialogTitle>Create {taskType}</DialogTitle>
                            <DialogDescription>
                                Complete the form
                            </DialogDescription>
                                {formStep !== 5 && 
                                    <p>
                                        {subject}&nbsp;{gradeLevel}&nbsp;{section}&nbsp;
                                    </p>
                                }
                        </DialogHeader>
                        <Form {...taskForm}>
                            <form onSubmit={taskForm.handleSubmit(onSubmit, onError)}>
                                <div>
                                    {formStep === 1 && 
                                        <div className="h-40">
                                            <div>Pick Subject:</div>
                                            {subjects.map((data: SubjectTypes, index: number) => (
                                                <Button 
                                                    key={index} 
                                                    variant={'outline'} 
                                                    onClick={() => {
                                                        setSubject(data)
                                                        taskForm.setValue('subject', data)
                                                        setFormStep(2)
                                                    }}
                                                >
                                                    {data}
                                                </Button>
                                            ))}
                                        </div>
                                    }
                                    {formStep === 2 && 
                                        <div className="h-40">
                                            <div>Pick Students:</div>
                                            <Button 
                                                variant={'outline'} 
                                                onClick={() => {
                                                    setGradeLevel(grade_assigned)
                                                    taskForm.setValue('grade', grade_assigned)
                                                    setFormStep(3)
                                                }}
                                            >
                                                {grade_assigned}
                                            </Button>
                                        </div>
                                    }
                                    {formStep === 3 &&
                                        <div className="h-40">
                                            <div>Pick Section:</div>
                                            {section_handled.map((data: string, index: number) => (
                                                <Button 
                                                    key={index} 
                                                    variant={'outline'} 
                                                    onClick={() => {
                                                        setSection(data)
                                                        taskForm.setValue('section', data)
                                                        setFormStep(4)
                                                    }}
                                                >
                                                    {data}
                                                </Button>
                                            ))}
                                        </div>
                                    }
                                    {formStep === 4 &&
                                        <>
                                            <FormField
                                                control={taskForm.control}
                                                name="task_no"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{toCamelCase(taskType)} Number:</FormLabel>
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
                                            <FormField
                                                control={taskForm.control}
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
                                            {taskForm.watch('total_items') !== 0 && // user should input total of items
                                                <Button 
                                                    type="button" 
                                                    onClick={() => {
                                                        setFormStep(5)
                                                    }}
                                                >
                                                    Next
                                                </Button>
                                            }
                                            
                                        </>
                                    }
                                    {formStep === 5 && 
                                    <>
                                        <div>Confirm creation</div>
                                        <div className="flex gap-8">
                                            <div>
                                                <Label>{taskType} No.</Label>
                                                <div>{taskForm.watch("task_no")}</div>
                                            </div>
                                            <div>
                                                <Label>Subject</Label>
                                                <div>{subject}</div>
                                            </div>
                                            <div>
                                                <Label>Grade Level</Label>
                                                <div>{gradeLevel}</div>
                                            </div>
                                            <div>
                                                <Label>Section</Label>
                                                <div>{section}</div>
                                            </div>
                                            <div>
                                                <Label>Total Items</Label>
                                                <div>{taskForm.watch("total_items")}</div>
                                            </div>
                                        </div>
                                        <div>
                                            {taskCount}/{taskLimit}
                                        </div>
                                    </>
                                    }
                                </div>
                                <DialogFooter className="mt-5">
                                    {formStep === 5 &&
                                        <Button 
                                            type="submit" 
                                            disabled={generateTask.isPending}
                                        >
                                            {generateTask.isPending 
                                                ? 'Creating...' 
                                                : 'Create'
                                            }
                                        </Button>
                                    }
                                    {formStep > 1 && 
                                        <Button
                                            type="button"
                                            variant={'secondary'}
                                            onClick={() => {
                                                setFormStep(formStep - 1)
                                                formStep === 4 && setSection('')
                                                formStep === 3 && setGradeLevel('')
                                                formStep === 2 && setSubject('')
                                            }}
                                        >
                                            Go back
                                        </Button>
                                    }
                                    <DialogClose asChild>
                                            <Button 
                                                type="button" 
                                                variant={'destructive'}
                                                onClick={() => {
                                                    resetFormStates()
                                                    taskForm.reset()
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
            <div className="flex space-x-2 items-center">
                <Label htmlFor="actions">Actions</Label>
                <Switch id="actions" checked={enableEdit} onCheckedChange={setEnableEdit}/>
            </div>
        </div>
    )
}
