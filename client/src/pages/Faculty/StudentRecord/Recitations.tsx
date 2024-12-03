import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { teacherInfo } from "@/hooks/useTeacherQueries"
import { useState } from "react"
import { taskSchema } from "@/schemas/teacherSchemas"
import { Form, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

export const Recitations = () => {
    const { teacher_role, grade_assigned, section_handled, subjects } = teacherInfo()
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
            task_no: 0,
            total_items: 0,
            quarter
        }
    })
    function onSubmit(values: z.infer<typeof taskSchema>) {
        console.log(values)
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
                                Choose students
                            </DialogDescription>
                        </DialogHeader>
                            <form onSubmit={taskForm.handleSubmit(onSubmit, onError)}>
                                <div>
                                    {!subject && 
                                        <div className="border-2 border-red-400 h-40">
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
                                        <div className="border-2 border-red-400 h-40">
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
                                        <div className="border-2 border-red-400 h-40">
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
                                </div>
                                <Button type="submit">
                                    Create
                                </Button>
                            </form>
                        <DialogFooter>
                            for button
                        </DialogFooter>
                </DialogContent>

            </Dialog>
        </div>
    )
}
