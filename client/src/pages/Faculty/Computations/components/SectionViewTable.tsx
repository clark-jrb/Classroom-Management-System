import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { calculatePerformance } from "@/helpers/calculate-performance"
import { useStudentsPerformance, useStudentsTakingMyTasks } from "@/hooks/useTaskQueries"
import { fetchMyStudents } from "@/hooks/useTeacherQueries"
import { SubjectTypes } from "@/types/types"
import { useQuarterStore } from "@/stores/filterSlice"
import { useForm } from "react-hook-form"
import { 
    Form
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { studentPerformanceSchema } from "@/schemas/computationSchemas"
import { StudentPerformance } from "@/types/computationTypes"
import { Button } from "@/components/ui/button"

export const SectionViewTable = ({ grade_assigned, section, subject }: {
    grade_assigned: string
    section: string
    subject: SubjectTypes
}) => {
    const { quarter } = useQuarterStore()
    const { data: students_performance } = useStudentsPerformance(section, subject, quarter)

    const studentPerformanceForm = useForm<StudentPerformance>({
        resolver: zodResolver(studentPerformanceSchema),
        defaultValues: {
            student_performance: students_performance
        }
    })

    function onSubmit(values: StudentPerformance) {
        console.log(values)
    }

    function onError(errors: any) { console.log("Form errors:", errors) }

    return (
        <div className="flex-1 border rounded-md">
                    <Table>
                        <TableCaption>A list of my students.</TableCaption>
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
                                <TableHead>GWA</TableHead>
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
                                    {/* <TableCell>{gwa ? gwa : 0}</TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            <Form {...studentPerformanceForm}>
                <form onSubmit={studentPerformanceForm.handleSubmit(onSubmit, onError)}>
                    <Button type="submit">
                        Save
                    </Button>
                </form>
            </Form>
        </div>
    )
}
