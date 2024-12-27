import { useParams } from "react-router-dom"
import { Procedures } from "./Procedures"
import { SubjectTypes } from "@/types/types"
import { teacherInfo } from "@/hooks/useTeacherQueries"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getMyStudents } from "@/services/TeacherService"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { calculateAverage } from "@/hooks/useTaskQueries"

export const SectionView = () => {
    const { section, subject } = useParams<{ section: string, subject: SubjectTypes }>()
    const { section_handled, subjects, grade_assigned } = teacherInfo()

    if (!section || !subject) {
        return <div>Error: Missing required route parameters</div>;
    }

    if (!subjects.includes(subject as SubjectTypes) || !section_handled.includes(section)) {
        return <div>Error: Invalid subject or section parameter</div>;
    }

    const fetchMyStudents = useSuspenseQuery({
        queryKey: ['my_students'],
        queryFn: () => getMyStudents(grade_assigned, section)
    })
    
    const myStudents = fetchMyStudents.data
    const specStudentTask = myStudents.map((student) => ({
        ...student,
        recit_average: calculateAverage(student.sid.sid, subject, 'recitation') ?? 0,
        // act_average: calculateAverage(student.sid.sid, subject, 'activity') ?? 0,
        // quiz_average: calculateAverage(student.sid.sid, subject, 'quiz') ?? 0,
        // proj_average: calculateAverage(student.sid.sid, subject, 'project') ?? 0,
        // summ_average: calculateAverage(student.sid.sid, subject, 'summative') ?? 0,
        // exam_average: calculateAverage(student.sid.sid, subject, 'exam') ?? 0
    }))

    return (
        <div className="flex h-full gap-5">
            <div className="flex-1 border rounded-md">
                <Table>
                    <TableCaption>A list of my students.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Last Name</TableHead>
                            <TableHead>First Name</TableHead>
                            <TableHead>Recitation</TableHead>
                            {/* <TableHead>Activity</TableHead>
                            <TableHead>Quiz</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead>Summative</TableHead>
                            <TableHead>Exam</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {specStudentTask.map(({
                            _id,
                            sid: { firstname, lastname },
                            recit_average,
                            // act_average,
                            // quiz_average,
                            // proj_average,
                            // summ_average,
                            // exam_average
                        }) => (
                            <TableRow key={_id}>
                                <TableCell className="font-medium">{lastname}</TableCell>
                                <TableCell>{firstname}</TableCell>
                                <TableCell>{recit_average.toFixed(2)} %</TableCell>
                                {/* <TableCell>{act_average.toFixed(2)} %</TableCell>
                                <TableCell>{quiz_average.toFixed(2)} %</TableCell>
                                <TableCell>{proj_average.toFixed(2)} %</TableCell>
                                <TableCell>{summ_average.toFixed(2)} %</TableCell>
                                <TableCell>{exam_average.toFixed(2)} %</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Procedures subject_handled={subject} section_assigned={section}/>
        </div>
    )
}
