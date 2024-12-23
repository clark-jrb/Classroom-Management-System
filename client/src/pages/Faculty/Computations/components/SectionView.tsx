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
import { useMyTasks } from "@/hooks/TaskQueries"

export const SectionView = () => {
    const { section, subject } = useParams<{ section: string, subject: SubjectTypes }>()
    const { section_handled, subjects, grade_assigned } = teacherInfo()
    const { getSpecificTaskTotal } = useMyTasks()

    if (!section || !subject) {
        return <div>Error: Missing required route parameters</div>;
    }

    const fetchMyStudents = useSuspenseQuery({
        queryKey: ['my_students'],
        queryFn: () => getMyStudents(grade_assigned, section)
    })

    const myStudents = fetchMyStudents.data
    const recit_total_items = getSpecificTaskTotal('recitation')

    const sum = recit_total_items.reduce((accu, curr) => accu + curr.total_items, 0)
    console.log(sum/sum * 6)

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
                        {myStudents.map(({
                            _id,
                            sid: { firstname, lastname }
                        }) => (
                            <TableRow key={_id}>
                                <TableCell className="font-medium">{lastname}</TableCell>
                                <TableCell>{firstname}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Procedures subject_handled={subject} section_assigned={section}/>
        </div>
    )
}
