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
import { Button } from "@/components/ui/button"
import { teacherInfo } from "@/hooks/useTeacherQueries"
import { useState } from "react"
import { taskSchema } from "@/schemas/teacherSchemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { taskFunctions } from "@/hooks/useTaskQueries"

export const Recitations = () => {
    const { generateTask } = taskFunctions()
    const { grade_assigned, section_handled, subjects } = teacherInfo()
    const taskType = 'recitation'
    const quarter = 'q1'
    const [subject, setSubject] = useState('')
    const [gradeLevel, setGradeLevel] = useState('')
    const [section, setSection] = useState('')

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
        generateTask.mutate(values)
    }

    function onError(errors: any) { console.log("Form errors:", errors) }

    return (
        <div>
            <Dialog>
                <div className="mb-3 text-xl">
                    Recitations
                </div>
                <DialogTrigger asChild>
                    <Button>
                        Create recitation record
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create Recitation</DialogTitle>
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
                                    {subject && gradeLevel && section && 
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
                                    }
                                </div>
                                <DialogFooter className="mt-5">
                                    {subject && gradeLevel && section &&
                                        <Button type="submit">
                                            Create
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
