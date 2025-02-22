import { SubjectTypes } from "@/types/GlobalTypes"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useStudentsQAMutations, useStudentsSG, useStudentsSGfromQA } from "@/hooks/useTaskQueries"
import { useQuarterStore } from "@/stores/filterSlice"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { StudentSG } from "@/types/ComputationTypes"
import { zodResolver } from "@hookform/resolvers/zod"
import { StudentSGSchema } from "@/schemas/computationSchemas"
import { Form } from "@/components/ui/form"
import { getChangedSG } from "@/helpers/changed-fields"

export const GradesViewTable = ({ section, subject }: {
    section: string
    subject: SubjectTypes
}) => {
    const { data: students_sg } = useStudentsSG(section, subject)
    const { data: students_sg_from_qa } = useStudentsSGfromQA(section, subject)
    const { updateSGfromQA } = useStudentsQAMutations(section, subject)
    const { quarter } = useQuarterStore()

    // for compare
    const sg_from_qa_by_quarter = students_sg_from_qa.filter((items) => items.quarter === quarter)
    
    // for form state
    const students_sg_by_quarter = students_sg.filter((items) => items.quarter === quarter)
    const formatted_students_sg = students_sg_by_quarter.map(({ sid: { sid }, ...data }) => ({
        sid,
        ...data
    }))
    
    const form = useForm<StudentSG>({
        resolver: zodResolver(StudentSGSchema),
        defaultValues: {
            student_sg: formatted_students_sg
        }
    })
    
    function onSubmit(values: StudentSG) {
        if (students_sg.length === 0) {
            console.log('there is no data')
        } else {
            const isSGZero = students_sg_from_qa.every(item => item.subj_grade === 0)
    
            if (!isSGZero) {
                const changedValues = getChangedSG(sg_from_qa_by_quarter, values.student_sg)
    
                if (Object.keys(changedValues).length === 0) {
                    // console.log(values)
                    console.log('there is nothing to update')
                } else {
                    updateSGfromQA.mutateAsync(values.student_sg)
                    console.log('subject grade re-submitted')
                }
            } else {
                updateSGfromQA.mutateAsync(values.student_sg)
                // console.log(values.student_sg)
                console.log('subject grade submitted')
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
                            <TableHead>Subject Grade</TableHead>
                            <TableHead>Remarks</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students_sg_by_quarter.map(({
                            sid: {
                                sid,
                                firstname,
                                lastname
                            },
                            subj_grade
                        }) => (
                            <TableRow key={sid}>
                                <TableCell className="font-medium text-base">{lastname}</TableCell>
                                <TableCell>{firstname}</TableCell>
                                <TableCell>{subj_grade.toFixed(0)}</TableCell>
                                <TableCell>{subj_grade >= 75 ? 'PASSED' : 'FAILED'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                        <Button 
                            type="submit"
                            disabled={students_sg.length === 0}
                        >
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
