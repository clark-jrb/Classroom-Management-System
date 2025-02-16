import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useStudentsQA } from "@/hooks/useTaskQueries"
import { QuarterTypes } from "@/types/types"

export const QATable = ({ section, grade_assigned, quarter }: {
    section: string
    grade_assigned: string
    quarter: QuarterTypes
}) => {
    const { data: students_qa } = useStudentsQA(grade_assigned, section)

    const filtered_qa = students_qa.filter(data => data.quarter === quarter)

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
                        <TableHead>Quarterly Average</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filtered_qa.map((data) => (
                        <TableRow key={data._id}>
                            <TableCell className="font-medium text-base">{data.sid.lastname}</TableCell>
                            <TableCell>{data.sid.firstname}</TableCell>
                            <TableCell>{data.science.toFixed(0)}</TableCell>
                            <TableCell>{data.math.toFixed(0)}</TableCell>
                            <TableCell>{data.english.toFixed(0)}</TableCell>
                            <TableCell>{data.filipino.toFixed(0)}</TableCell>
                            <TableCell>{data.mapeh.toFixed(0)}</TableCell>
                            <TableCell>{data.hekasi.toFixed(0)}</TableCell>
                            <TableCell>--</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
