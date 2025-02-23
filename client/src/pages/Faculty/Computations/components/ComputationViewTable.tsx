import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useStudentsPerformance } from "@/hooks/useTaskQueries"
import { SubjectTypes } from "@/types/GlobalTypes"
import { useQuarterStore } from "@/stores/filterSlice"
import { useForm } from "react-hook-form"
import { 
    Form
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { StudentSGSchema } from "@/schemas/computationSchemas"
import { StudentSG } from "@/types/ComputationTypes"
import { Button } from "@/components/ui/button"
import { useStudentsPerformanceMutations } from "@/hooks/useTaskQueries"
import { useStudentsSG } from "@/hooks/useTaskQueries"
import { getChangedSG } from "@/helpers/changed-fields"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

export const ComputationViewTable = ({ section, subject, weight }: {
    section: string
    subject: SubjectTypes
    weight: number
}) => {
    const queryClient = useQueryClient()
    const { updateSG, generateStudentSG } = useStudentsPerformanceMutations()
    const { quarter } = useQuarterStore()
    const { data: students_sg } = useStudentsSG(section, subject)
    const { data: students_performance } = useStudentsPerformance(section, subject, quarter)

    const students_calculated_sg = students_performance.map(({ sid, recitation, activity, quiz, project, summative, exam }) => ({
        sid,
        section,
        subject,
        subj_grade: (recitation + activity + quiz + project + summative + exam) || 0,
        quarter: quarter
    }))

    const sg_by_quarter = students_sg.filter((items) => items.quarter === quarter)

    const form = useForm<StudentSG>({
        resolver: zodResolver(StudentSGSchema),
        defaultValues: {
            student_sg: students_calculated_sg
        }
    })
    
    function onSubmit(values: StudentSG) {
        // A condition where should the values submitted update or create?
        if (sg_by_quarter.length > 0) {
            const changedValues = getChangedSG(sg_by_quarter, values.student_sg)

            if (Object.keys(changedValues).length === 0) {
                toast.warning('There is nothing to update')
            } else {
                updateSG.mutateAsync(
                    {
                        value: changedValues,
                        subject,
                        quarter
                    }, 
                    {
                        onSuccess: (data) => {
                            const { message } = data
                            toast.success(message)
                            refetchData()
                        },
                        onError: (error) => {
                            console.log(error)
                            toast.error('There is an error updating students subject grade')
                        }
                    }
                )
                // console.log(changedValues)
            }
        } else {
            generateStudentSG.mutateAsync(values.student_sg, {
                onSuccess: (data) => {
                    const { message } = data
                    // console.log(message)
                    toast.success(message)
                    refetchData()
                },
                onError: (error) => {
                    console.log('Error: ' + error)
                    toast.error('There is an error generating students subject grade')
                }
            })
        }
    }

    function onError(errors: any) { 
        console.log("Form errors:", errors) 
    }

    function refetchData() {
        queryClient.invalidateQueries({ queryKey: ['students_subject_grade', section, subject] })
    }

    return (
        <div className="flex-1 border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Last Name</TableHead>
                        <TableHead className="w-[150px]">First Name</TableHead>
                        <TableHead>Recitation</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead>Quiz</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Summative</TableHead>
                        <TableHead>Exam</TableHead>
                        <TableHead>Subject Grade</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students_performance.map(({
                        sid,
                        firstname,
                        lastname,
                        recitation,
                        activity,
                        quiz,
                        project,
                        summative,
                        exam
                    }) => (
                        <TableRow key={sid}>
                            <TableCell className="font-medium text-base">{lastname}</TableCell>
                            <TableCell>{firstname}</TableCell>
                            <TableCell>{recitation ? recitation.toFixed(2) : 0}</TableCell>
                            <TableCell>{activity ? activity.toFixed(2) : 0}</TableCell>
                            <TableCell>{quiz ? quiz.toFixed(2) : 0}</TableCell>
                            <TableCell>{project ? project.toFixed(2) : 0}</TableCell>
                            <TableCell>{summative ? summative.toFixed(2) : 0}</TableCell>
                            <TableCell>{exam ? exam.toFixed(2) : 0}</TableCell>
                            <TableCell>
                                {(
                                    recitation + 
                                    activity +
                                    quiz +
                                    project +
                                    summative +
                                    exam
                                ).toFixed(1) || 0}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                    <Button 
                        type="submit" 
                        onClick={() => {
                            students_calculated_sg.forEach(({ subj_grade }, index) => {
                                form.setValue(`student_sg.${index}.subj_grade`, subj_grade)
                                form.setValue(`student_sg.${index}.quarter`, quarter)
                            })
                        }}
                        disabled={weight !== 100}
                    >
                        {sg_by_quarter.length > 0
                            ? 'Update Subject Grade'
                            : 'Save Subject Grade'
                        }
                    </Button>
                </form>
            </Form>
        </div>
    )
}
