import { useParams } from "react-router-dom"
import { Procedures } from "./Procedures"
import { SubjectTypes } from "@/types/types"
import { teacherInfo, fetchMyStudents } from "@/hooks/useTeacherQueries"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useSpecificStudentTask, calculateAverage } from "@/hooks/useTaskQueries"

export const SectionView = () => {
    const { section, subject } = useParams<{ section: string, subject: SubjectTypes }>()
    const { section_handled, subjects, grade_assigned } = teacherInfo()

    if (!section || !subject) {
        return <div>Error: Missing required route parameters</div>
    }

    if (!subjects.includes(subject as SubjectTypes) || !section_handled.includes(section)) {
        return <div>Error: Invalid subject or section parameter</div>
    }

    const { data: my_students } = fetchMyStudents(grade_assigned, section)
    const { data: spec_student_tasks } = useSpecificStudentTask()
    
    const data = my_students.map(({ sid: { sid, firstname, lastname }, ...student}) => ({
        ...student,
        firstname,
        lastname,
        recit_average: calculateAverage(sid, spec_student_tasks, subject, 'recitation')
    }))

    console.log(data)
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map(({
                            _id,
                            firstname,
                            lastname,
                            recit_average
                        }) => (
                            <TableRow key={_id}>
                                <TableCell className="font-medium">{lastname}</TableCell>
                                <TableCell>{firstname}</TableCell>
                                <TableCell>{recit_average.toFixed(2)} %</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Procedures subject_handled={subject} section_assigned={section}/>
        </div>
    )
}
