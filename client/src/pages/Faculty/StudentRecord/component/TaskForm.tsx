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
import { useEffect, useMemo, useState } from "react"
import { taskSchema } from "@/schemas/task.schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useTaskMutations, useMyTasks } from "@/hooks/useTaskQuery"
import { useQueryClient } from "@tanstack/react-query"
import { TaskTypes, SubjectTypes, GradeLevels } from "@/types/global.types"
import { DialogClose } from "@radix-ui/react-dialog"
import { toast } from "sonner"
import { toCamelCase } from "@/helpers/camel-case"
import { TTaskForm } from "@/types/task.types"
import { useCurrentQuarterStore } from "@/stores/globalSlice"
import { getGradeName } from "@/helpers/get-quarter"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"


export const TaskForm = ({ taskType }: {
    taskType: TaskTypes
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

    useEffect(() => {
        if (formStep === 4) {
            taskForm.setValue("task_no", taskCount + 1)
            console.log('task_no set')
        }
    }, [formStep, taskCount, taskForm])
    
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
                        <DialogHeader className="space-y-4">
                            <DialogTitle className="font-medium">
                                <div className="text-xl text-navy pb-4 border-b border-light_navy leading-none">
                                    Create {taskType} record
                                </div>
                            </DialogTitle>
                            <DialogDescription>
                                Complete the form:
                            </DialogDescription>
                                {formStep !== 5 && 
                                    <div className={`border-b flex text-navy gap-2 ${subject ? 'pb-4' : ''}`}>
                                        {subject &&
                                            <>
                                            <ChevronRight strokeWidth={1}/>
                                            {toCamelCase(subject)}
                                            </>
                                        }
                                        {gradeLevel && 
                                            <>
                                            <ChevronRight strokeWidth={1}/>
                                            {getGradeName(gradeLevel as GradeLevels)}
                                            </>
                                        }
                                        {section &&
                                            <>
                                            <ChevronRight strokeWidth={1}/>
                                            {toCamelCase(section)}
                                            </>
                                        }
                                    </div>
                                }
                        </DialogHeader>
                        <Form {...taskForm}>
                            <form onSubmit={taskForm.handleSubmit(onSubmit, onError)}>
                                <div>
                                    {formStep === 1 && 
                                        <div className="h-40 space-y-4">
                                            <div className="text-gray-500 text-sm">Pick Subject:</div>
                                            <div className="flex gap-4">
                                                {subjects.map((data: SubjectTypes, index: number) => (
                                                    <Button 
                                                        key={index} 
                                                        variant={'outline'} 
                                                        className="text-navy p-6 text-md"
                                                        onClick={() => {
                                                            setSubject(data)
                                                            taskForm.setValue('subject', data)
                                                            setFormStep(2)
                                                        }}
                                                    >
                                                        {toCamelCase(data)}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    }
                                    {formStep === 2 && 
                                        <div className="h-40 space-y-4">
                                            <div className="text-gray-500 text-sm">Pick Students:</div>
                                            <Button 
                                                variant={'outline'} 
                                                onClick={() => {
                                                    setGradeLevel(grade_assigned)
                                                    taskForm.setValue('grade', grade_assigned)
                                                    setFormStep(3)
                                                }}
                                                className="text-navy p-6 text-md"
                                            >
                                                {getGradeName(grade_assigned)}
                                            </Button>
                                        </div>
                                    }
                                    {formStep === 3 &&
                                        <div className="h-40 space-y-4">
                                            <div className="text-gray-500 text-sm">Pick Section:</div>
                                            {section_handled.map((data: string, index: number) => (
                                                <Button 
                                                    key={index} 
                                                    variant={'outline'} 
                                                    onClick={() => {
                                                        setSection(data)
                                                        taskForm.setValue('section', data)
                                                        setFormStep(4)
                                                    }}
                                                    className="text-navy p-6 text-md"
                                                >
                                                    {toCamelCase(data)}
                                                </Button>
                                            ))}
                                        </div>
                                    }
                                    {formStep === 4 &&
                                        <div className="space-y-4">
                                            <div className="flex gap-4">
                                                <div className="flex-1">
                                                    <FormField
                                                        control={taskForm.control}
                                                        name="task_no"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-gray-500">{toCamelCase(taskType)} Number:</FormLabel>
                                                                <FormControl>
                                                                    <Input 
                                                                        type="number"
                                                                        placeholder="Task number"
                                                                        className="p-6 text-md"
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
                                                </div>
                                                <div className="flex-1">
                                                    <FormField
                                                        control={taskForm.control}
                                                        name="total_items"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-gray-500">Total items:</FormLabel>
                                                                <FormControl>
                                                                    <Input 
                                                                        type="number"
                                                                        placeholder="total items of the task"
                                                                        className="p-6 text-md"
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
                                                </div>
                                            </div>
                                            
                                            {/* <div className="w-full"> */}
                                                {taskForm.watch('total_items') !== 0 && // user should input total of items
                                                    <Button 
                                                        type="button" 
                                                        variant={'ghost'}
                                                        className="w-full text-navy"
                                                        onClick={() => {
                                                            setFormStep(5)
                                                        }}
                                                    >
                                                        Next <ArrowRight/>
                                                    </Button>
                                                }
                                            {/* </div> */}
                                            
                                        </div>
                                    }
                                    {formStep === 5 && 
                                        <div className="space-y-4">
                                            <div className="flex border-b">
                                                <div className="text-navy text-lg mb-2">
                                                    Confirm creation
                                                </div>
                                                <div className="ms-auto text-gray-500 text-sm">
                                                    Existing:&nbsp;
                                                    {taskCount}&nbsp;/&nbsp;{taskLimit}
                                                </div>
                                            </div>
                                            <div className="flex gap-6 h-[10rem]">
                                                <div className="space-y-2">
                                                    <Label className="text-gray-500">{toCamelCase(taskType)} No.</Label>
                                                    <div className="text-navy text-lg">{taskForm.watch("task_no")}</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-gray-500">Subject</Label>
                                                    <div className="text-navy text-lg">{toCamelCase(subject)}</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-gray-500">Grade Level</Label>
                                                    <div className="text-navy text-lg">{getGradeName(gradeLevel as GradeLevels)}</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-gray-500">Section</Label>
                                                    <div className="text-navy text-lg">{toCamelCase(section)}</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-gray-500">Total Items</Label>
                                                    <div className="text-navy text-lg">{taskForm.watch("total_items")}</div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    }
                                </div>
                                <DialogFooter className="mt-4">
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
                                            <ArrowLeft/>
                                        </Button>
                                    }
                                    {formStep === 5 &&
                                        <Button 
                                            type="submit" 
                                            variant={'navy'}
                                            disabled={generateTask.isPending}
                                        >
                                            {generateTask.isPending 
                                                ? 'Creating...' 
                                                : 'Create'
                                            }
                                        </Button>
                                    }
                                    <DialogClose asChild>
                                            <Button 
                                                type="button" 
                                                variant={'ghost'}
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
        </div>
    )
}
