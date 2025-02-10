import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useStudentsGPA } from "@/hooks/useTaskQueries"

export const EvaluationTable = ({ section, grade_assigned }: {
    section: string
    grade_assigned: string
}) => {
    const { data: students_gpas } = useStudentsGPA(grade_assigned, section)

    console.log(students_gpas)

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Last Name</TableHead>
                        <TableHead className="w-[150px]">First Name</TableHead>
                        <TableHead>Science</TableHead>
                        <TableHead>Math</TableHead>
                        <TableHead>English</TableHead>
                        <TableHead>Filipino</TableHead>
                        <TableHead>MAPEH</TableHead>
                        <TableHead>Hekasi</TableHead>
                        <TableHead>General Average</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students_gpas.map(({
                        sid,
                        firstname,
                        lastname,
                        gpa
                    }) => (
                        <TableRow key={sid}>
                            <TableCell className="font-medium text-base">{lastname}</TableCell>
                            <TableCell>{firstname}</TableCell>
                            <TableCell>{gpa.science}</TableCell>
                            <TableCell>{gpa.math}</TableCell>
                            <TableCell>{gpa.english}</TableCell>
                            <TableCell>{gpa.filipino}</TableCell>
                            <TableCell>{gpa.mapeh}</TableCell>
                            <TableCell>{gpa.hekasi}</TableCell>
                            <TableCell>--</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
