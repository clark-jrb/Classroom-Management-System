import { SubjectTypes } from "@/types/types"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useStudentsGWA } from "@/hooks/useTaskQueries"
import { useQuarterStore } from "@/stores/filterSlice"


export const GradesViewTable = ({ section, subject }: {
    section: string
    subject: SubjectTypes
}) => {
    const { data: students_gwas } = useStudentsGWA(section, subject)
    const { quarter } = useQuarterStore()

    const students_gwas_by_quarter = students_gwas.filter((items) => items.quarter === quarter)

    return (
        <div className="flex-1 border rounded-md">
            <Table>
                <TableCaption>A list of my students.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Last Name</TableHead>
                        {/* <TableHead className="w-[150px]">First Name</TableHead> */}
                        <TableHead>GWA</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students_gwas_by_quarter.map(({
                        sid,
                        gwa
                    }) => (
                        <TableRow key={sid}>
                            {/* <TableCell className="font-medium text-base">{lastname}</TableCell> */}
                            <TableCell>{sid}</TableCell>
                            <TableCell>{gwa}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
