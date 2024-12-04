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
import { teacherInfo } from "@/hooks/useTeacherQueries"
import { useState } from "react"
import { taskSchema } from "@/schemas/teacherSchemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { taskFunctions } from "@/hooks/useTaskQueries"

interface TaskProps {
    taskType: string
}

export const TaskForm = ({ taskType }: TaskProps) => {
    const { generateTask } = taskFunctions() // mutation function
    const { grade_assigned, section_handled, subjects } = teacherInfo() // data from the hook
    const quarter = 'q1' // QUARTER (subject to change)
    const [subject, setSubject] = useState('') // SUBJECT 
    const [gradeLevel, setGradeLevel] = useState('') // GRADE LEVEL 
    const [section, setSection] = useState('') // SECTION 
    const [confirmForm, setConfirmForm] = useState(false) // CONFIRM VALUES PAGE
    const [open, openDialog] = useState(false) // DIALOG

    const taskForm = useForm<z.infer<typeof taskSchema>>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            subject: subject,
            grade: gradeLevel,
            section,
            type: taskType,
            task_no: 1,
            quarter
        }
    })

    function onSubmit(values: z.infer<typeof taskSchema>) {
        console.log(values)
        generateTask.mutateAsync(values, {
            onSuccess: (data) => {
                const { message } = data
                openDialog(false)
                
                console.log(message)

                taskForm.reset()
                setConfirmForm(false)
                setGradeLevel('')
                setSection('')
                setSubject('')
            },
            onError: (error) => {
                console.log(error)
            }
        })
    }

    function onError(errors: any) { console.log("Form errors:", errors) }

    return (
        <div>
            <Dialog open={open} onOpenChange={openDialog}>
                <div className="mb-3 text-xl">
                    {taskType}
                </div>
                <DialogTrigger asChild>
                    <Button>
                        Create {taskType} record
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                            <DialogTitle>Create {taskType}</DialogTitle>
                            <DialogDescription>
                                Complete the form
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...taskForm}>
                            <form onSubmit={taskForm.handleSubmit(onSubmit, onError)}>
                                <div>
                                    {!subject && 
                                        <div className="h-40">
                                            <div>Pick Subject:</div>
                                            {subjects?.map((data: string, index: number) => (
                                                <Button 
                                                    key={index} 
                                                    variant={'outline'} 
                                                    onClick={() => {
                                                        setSubject(data)
                                                        taskForm.setValue('subject', data)
                                                    }}
                                                >
                                                    {data}
                                                </Button>
                                            ))}
                                        </div>
                                    }
                                    {subject && !gradeLevel && 
                                        <div className="h-40">
                                            <div>Pick Students:</div>
                                            <Button 
                                                variant={'outline'} 
                                                onClick={() => {
                                                    setGradeLevel(grade_assigned)
                                                    taskForm.setValue('grade', grade_assigned)
                                                }}
                                            >
                                                {grade_assigned}
                                            </Button>
                                        </div>
                                    }
                                    {subject && gradeLevel && !section &&
                                        <div className="h-40">
                                            <div>Pick Section:</div>
                                            {section_handled?.map((data: string, index: number) => (
                                                <Button 
                                                    key={index} 
                                                    variant={'outline'} 
                                                    onClick={() => {
                                                        setSection(data)
                                                        taskForm.setValue('section', data)
                                                    }}
                                                >
                                                    {data}
                                                </Button>
                                            ))}
                                        </div>
                                    }
                                    {subject && gradeLevel && section && !confirmForm &&
                                        <>
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
                                                                min={5}
                                                                max={100}
                                                            />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="button" onClick={() => setConfirmForm(true)}>Next</Button>
                                        </>
                                    }
                                    {subject && gradeLevel && section && confirmForm && 
                                    <>
                                        <div>Confirm creation</div>
                                        <div className="flex gap-8">
                                            <div>
                                                <Label>{taskType} No.</Label>
                                                <div>{taskForm.watch('task_no')}</div>
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
                                                <div>{taskForm.watch('total_items')}</div>
                                            </div>
                                        </div>
                                    </>
                                    }
                                </div>
                                <DialogFooter className="mt-5">
                                    {subject && gradeLevel && section && confirmForm &&
                                        <Button type="submit" disabled={generateTask.isPending}>
                                            {generateTask.isPending ? 'Creating...' : 'Create'}
                                        </Button>
                                    }
                                </DialogFooter>
                            </form>
                        </Form>
                </DialogContent>

            </Dialog>
        </div>
    )
}
