import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useStudentsCalculatedGPA } from "@/hooks/useTaskQueries"

export const GATable = ({ section, grade_assigned }: {
    section: string
    grade_assigned: string
}) => {
    const { data: students_gpas } = useStudentsCalculatedGPA(grade_assigned, section)

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
                            <TableCell>{gpa.science.toFixed(0)}</TableCell>
                            <TableCell>{gpa.math.toFixed(0)}</TableCell>
                            <TableCell>{gpa.english.toFixed(0)}</TableCell>
                            <TableCell>{gpa.filipino.toFixed(0)}</TableCell>
                            <TableCell>{gpa.mapeh.toFixed(0)}</TableCell>
                            <TableCell>{gpa.hekasi.toFixed(0)}</TableCell>
                            <TableCell>--</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
