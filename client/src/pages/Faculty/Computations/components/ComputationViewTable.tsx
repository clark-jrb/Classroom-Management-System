import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useStudentsPerformance } from "@/hooks/useTaskQueries"
import { QuarterTypes, SubjectTypes } from "@/types/global.types"
import { useForm } from "react-hook-form"
import { 
    Form
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { StudentSGSchema } from "@/schemas/computation.schema"
import { StudentSG } from "@/types/computation.types"
import { Button } from "@/components/ui/button"
import { useStudentsPerformanceMutations } from "@/hooks/useTaskQueries"
import { useStudentsSG } from "@/hooks/useTaskQueries"
import { getChangedSG } from "@/helpers/changed-fields"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useMemo } from "react"

export const ComputationViewTable = ({ section, subject, weight, quarter }: {
    section: string
    subject: SubjectTypes
    weight: number
    quarter: QuarterTypes
}) => {
    const queryClient = useQueryClient()
    const { updateSG, generateStudentSG } = useStudentsPerformanceMutations()
    const { data: students_sg } = useStudentsSG(section, subject)
    const { data: students_performance } = useStudentsPerformance(section, subject, quarter)

    const calculated_sp = students_performance
        .map(({ sid, average }) => ({
            sid,
            section,
            subject,
            subj_grade: average,
            quarter: quarter
        }))

    const sg_by_quarter = students_sg
        .filter((items) => items.quarter === quarter)

    const form = useForm<StudentSG>({
        resolver: zodResolver(StudentSGSchema),
        defaultValues: {
            student_sg: calculated_sp
        }
    })

    const changedValues = sg_by_quarter.length !== 0 
        ? getChangedSG(sg_by_quarter, calculated_sp) 
        : []

    const isChanged = useMemo(() => changedValues.length > 0, [changedValues])

    useEffect(() => {
        if (isChanged) {
            toast.info('There are some changes')
        }
    }, [isChanged])
    
    function onSubmit(values: StudentSG) {
        // A condition where should the values submitted update or create?
        if (sg_by_quarter.length > 0) {
            if (changedValues.length === 0) {
                toast.warning('There are no changes')
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

    useEffect(() => {
        if (students_performance) {
            form.reset({ student_sg: calculated_sp })
        }
    }, [students_performance])

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
                        disabled={weight !== 100}
                    >
                        {updateSG.isPending || generateStudentSG.isPending
                            ? 'Processing...'
                            : sg_by_quarter.length > 0
                                ? 'Update Subject Grade'
                                : 'Save Subject Grade'
                        }
                    </Button>
                </form>
            </Form>
        </div>
    )
}
