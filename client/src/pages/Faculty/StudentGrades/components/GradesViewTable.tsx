import { SubjectTypes } from "@/types/types"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useStudentsGPAMutations, useStudentsGWA, useStudentsSubjectGPA } from "@/hooks/useTaskQueries"
import { useQuarterStore } from "@/stores/filterSlice"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { StudentGWA } from "@/types/computationTypes"
import { zodResolver } from "@hookform/resolvers/zod"
import { studentGWASchema } from "@/schemas/computationSchemas"
import { Form } from "@/components/ui/form"
import { getChangedGWAs } from "@/helpers/changed-fields"

export const GradesViewTable = ({ section, subject }: {
    section: string
    subject: SubjectTypes
}) => {
    const { data: students_gwas } = useStudentsGWA(section, subject)
    const { data: students_sub_gpa } = useStudentsSubjectGPA(section, subject)
    const { updateSubjectGPA } = useStudentsGPAMutations(section, subject)
    const { quarter } = useQuarterStore()

    // for compare
    const students_sub_gpa_by_quarter = students_sub_gpa.filter((items) => items.quarter === quarter)
    
    // for form state
    const students_gwas_by_quarter = students_gwas.filter((items) => items.quarter === quarter)
    const converted_students_gwas = students_gwas_by_quarter.map(({ sid: { sid }, ...data }) => ({
        sid,
        ...data
    }))
    
    const form = useForm<StudentGWA>({
        resolver: zodResolver(studentGWASchema),
        defaultValues: {
            student_gwa: converted_students_gwas
        }
    })

    // console.log('student gwas: ', converted_students_gwas)
    
    function onSubmit(values: StudentGWA) {
        if (converted_students_gwas.length === 0) {
            console.log('there is no data')
        } else {
            const isAllZero = students_sub_gpa.every(item => item.gwa === 0)
    
            if (!isAllZero) {
                const changedValues = getChangedGWAs(students_sub_gpa_by_quarter, values.student_gwa)
    
                if (Object.keys(changedValues).length === 0) {
                    // console.log(values)
                    console.log('there is nothing to update')
                } else {
                    updateSubjectGPA.mutateAsync(values.student_gwa)
                    console.log('gwas re-submitted')
                }
            } else {
                updateSubjectGPA.mutateAsync(values.student_gwa)
                // console.log(values.student_gwa)
                console.log('gwas submitted')
            }
        }
    }

    function onError(errors: any) { 
        console.log("Form errors:", errors) 
    }

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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                        <Button type="submit">
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
