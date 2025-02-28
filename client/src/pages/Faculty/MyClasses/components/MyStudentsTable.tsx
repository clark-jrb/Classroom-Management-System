import { useMyStudentsData } from "@/hooks/useTeacherQuery"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const MyStudentsTable = ({ section, grade_level }: {
    section: string
    grade_level: string
}) => {
    const { data } = useMyStudentsData(grade_level, section)
    // console.log(data)

    return (
        <div>
            <div>
                {grade_level}{section}
            </div>
            {data.length > 0 && 
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[15rem]">Last Name</TableHead>
                            <TableHead className="w-[15rem]">First Name</TableHead>
                            <TableHead className="w-[15rem]">Middle Name</TableHead>
                            <TableHead className="w-[10rem]">Sex</TableHead>
                            <TableHead>Contact</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map(({ _id, sid }) => (
                            <TableRow key={_id}>
                                <TableCell>{sid.lastname}</TableCell>
                                <TableCell>{sid.firstname}</TableCell>
                                <TableCell>{sid.middlename}</TableCell>
                                <TableCell>{sid.sex}</TableCell>
                                <TableCell>{sid.contact}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            }
            {!data.length && 
                <div>Students don't exist yet</div>
            }
        </div>
    )
}
