import { SubjectTypes } from "@/types/types"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useStudentsGWA } from "@/hooks/useTaskQueries"
import { useQuarterStore } from "@/stores/filterSlice"
import { Button } from "@/components/ui/button"


export const GradesViewTable = ({ section, subject }: {
    section: string
    subject: SubjectTypes
}) => {
    const { data: students_gwas } = useStudentsGWA(section, subject)
    const { quarter } = useQuarterStore()

    const students_gwas_by_quarter = students_gwas.filter((items) => items.quarter === quarter)

    return (
        <div className="space-y-4">
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[150px]">Last Name</TableHead>
                            <TableHead className="w-[150px]">First Name</TableHead>
                            <TableHead>GWA</TableHead>
                            <TableHead>Remarks</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students_gwas_by_quarter.map(({
                            sid: {
                                sid,
                                firstname,
                                lastname
                            },
                            gwa
                        }) => (
                            <TableRow key={sid}>
                                <TableCell className="font-medium text-base">{lastname}</TableCell>
                                <TableCell>{firstname}</TableCell>
                                <TableCell>{gwa.toFixed(0)}</TableCell>
                                <TableCell>{gwa >= 75 ? 'PASSED' : 'FAILED'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
            <div>
                <Button>
                    Submit
                </Button>
            </div>
        </div>
    )
}
