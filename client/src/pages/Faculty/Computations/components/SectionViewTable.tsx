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
        firstname,
        lastname,
        recitation: calculatePerformance(sid, students_taking_my_tasks, subject, 'recitation', quarter, gradeLevel, section),
        activity: calculatePerformance(sid, students_taking_my_tasks, subject, 'activity', quarter, gradeLevel, section),
        quiz: calculatePerformance(sid, students_taking_my_tasks, subject, 'quiz', quarter, gradeLevel, section),
        project: calculatePerformance(sid, students_taking_my_tasks, subject, 'project', quarter, gradeLevel, section),
        summative: calculatePerformance(sid, students_taking_my_tasks, subject, 'summative', quarter, gradeLevel, section),
        exam: calculatePerformance(sid, students_taking_my_tasks, subject, 'exam', quarter, gradeLevel, section)
    }))

    // console.table(data)

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
                            <TableCell>{recitation ? recitation.toFixed(2) : 0}</TableCell>
                            <TableCell>{activity ? activity.toFixed(2) : 0}</TableCell>
                            <TableCell>{quiz ? quiz.toFixed(2) : 0}</TableCell>
                            <TableCell>{project ? project.toFixed(2) : 0}</TableCell>
                            <TableCell>{summative ? summative.toFixed(2) : 0}</TableCell>
                            <TableCell>{exam ? exam.toFixed(2) : 0}</TableCell>
                            <TableCell>
                                {(recitation + activity + quiz + project + summative + exam).toFixed(1)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
