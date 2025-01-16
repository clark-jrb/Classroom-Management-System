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
import { useStudentsTakingMyTasks } from "@/hooks/useTaskQueries"
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
    const { data: my_students } = fetchMyStudents(grade_assigned, section)  // gets all teacher's students
    const { data: students_taking_my_tasks } = useStudentsTakingMyTasks()   // gets all teacher's students taking his/her tasks

    /** 
     * this will map all the teacher's students and then executes the function that 
     * has the parameter of the students_taking_my_tasks array to find according to 
     * student's id and then gets ALL specific task
     * (ex. a student has quiz 1, quiz 2, and quiz 3) then calculates its performance (%)
     */
    const data = my_students.map(({ sid: { sid, firstname, lastname }, gradeLevel, section, ...student}) => ({
        ...student,
        sid,
        gradeLevel,
        section,
        firstname,
        lastname,
        recitation: Number(calculatePerformance(sid, students_taking_my_tasks, subject, 'recitation', quarter, gradeLevel, section).toFixed(2)),
        activity: Number(calculatePerformance(sid, students_taking_my_tasks, subject, 'activity', quarter, gradeLevel, section).toFixed(2)),
        quiz: Number(calculatePerformance(sid, students_taking_my_tasks, subject, 'quiz', quarter, gradeLevel, section).toFixed(2)),
        project: Number(calculatePerformance(sid, students_taking_my_tasks, subject, 'project', quarter, gradeLevel, section).toFixed(2)),
        summative: Number(calculatePerformance(sid, students_taking_my_tasks, subject, 'summative', quarter, gradeLevel, section).toFixed(2)),
        exam: Number(calculatePerformance(sid, students_taking_my_tasks, subject, 'exam', quarter, gradeLevel, section).toFixed(2))
    }))

    console.log(data)

    const studentPerformance = data.map((data) => ({
        ...data,
        quarter,
        subject
    }))

    const studentPerformanceForm = useForm<StudentPerformance>({
        resolver: zodResolver(studentPerformanceSchema),
        defaultValues: {
            student_performance: studentPerformance.map(data => ({
                ...data,
                gwa: Number(
                    (
                        data.recitation +
                        data.activity +
                        data.quiz +
                        data.project +
                        data.summative +
                        data.exam 
                    ).toFixed(1)
                )
            }))
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
                            {data.map(({
                                _id,
                                firstname,
                                lastname,
                                recitation,
                                activity,
                                quiz,
                                project,
                                summative,
                                exam
                            }) => (
                                <TableRow key={_id}>
                                    <TableCell className="font-medium text-base">{lastname}</TableCell>
                                    <TableCell>{firstname}</TableCell>
                                    <TableCell>{recitation ? recitation : 0}</TableCell>
                                    <TableCell>{activity ? activity : 0}</TableCell>
                                    <TableCell>{quiz ? quiz : 0}</TableCell>
                                    <TableCell>{project ? project : 0}</TableCell>
                                    <TableCell>{summative ? summative : 0}</TableCell>
                                    <TableCell>{exam ? exam : 0}</TableCell>
                                    <TableCell>
                                        {( recitation + activity + quiz + project + summative + exam ).toFixed(1)}
                                    </TableCell>
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
