import { useParams } from "react-router-dom"
import { Procedures } from "./Procedures"
import { SubjectTypes } from "@/types/types"
import { teacherInfo } from "@/hooks/TeacherQueries"
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
import { calculateAverage } from "@/hooks/TaskQueries"

export const SectionView = () => {
    const { section, subject } = useParams<{ section: string, subject: SubjectTypes }>()
    const { section_handled, subjects, grade_assigned } = teacherInfo()

    if (!section || !subject) {
        return <div>Error: Missing required route parameters</div>;
    }

    const fetchMyStudents = useSuspenseQuery({
        queryKey: ['my_students'],
        queryFn: () => getMyStudents(grade_assigned, section)
    })
    
    const myStudents = fetchMyStudents.data
    const specStudentTask = myStudents.map((student) => ({
        ...student,
        recit_average: calculateAverage(student.sid.sid, subject, 'recitation') ?? 0,
        act_average: calculateAverage(student.sid.sid, subject, 'activity') ?? 0,
    }))

    // console.log(specStudentTask)


    if (!subjects.includes(subject as SubjectTypes) || !section_handled.includes(section)) {
        return <div>Error: Invalid subject or section parameter</div>;
    }

    return (
        <div className="flex h-full gap-5">
            <div className="flex-1 border rounded-md">
                <Table>
                    <TableCaption>A list of my students.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Last Name</TableHead>
                            <TableHead>First Name</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {specStudentTask.map(({
                            _id,
                            sid: { firstname, lastname },
                            recit_average,
                            act_average
                        }) => (
                            <TableRow key={_id}>
                                <TableCell className="font-medium">{lastname}</TableCell>
                                <TableCell>{firstname}</TableCell>
                                <TableCell>Recitation: {recit_average.toFixed(2)} %</TableCell>
                                <TableCell>Activity: {act_average.toFixed(2)} %</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Procedures subject_handled={subject} section_assigned={section}/>
        </div>
    )
}
