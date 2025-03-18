import { QuarterTypes, SubjectTypes } from "@/types/global.types"
import { useStudentsQAMutations, useStudentsSG, useStudentsSGfromQA } from "@/hooks/useTaskQuery"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { StudentSG } from "@/types/computation.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { StudentSGSchema } from "@/schemas/computation.schema"
import { Form } from "@/components/ui/form"
import { getChangedSG } from "@/helpers/changed-fields"
import { toast } from "sonner"
import { useEffect, useMemo } from "react"
import { teacherClassInfo } from "@/hooks/useTeacherQuery"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { Check, LoaderCircle } from "lucide-react"

export const GradesViewTable = ({ section, subject, quarter }: {
    section: string
    subject: SubjectTypes
    quarter: QuarterTypes
}) => {
    const { data: students_sg } = useStudentsSG(section, subject)
    const { data: students_sg_from_qa } = useStudentsSGfromQA(section, subject)
    const { teacher_role } = teacherClassInfo()
    const { updateSGfromQA } = useStudentsQAMutations(section, subject)

    // to compare (from 'students_qas' collection)
    const sg_from_qa_by_quarter = students_sg_from_qa
        .filter((items) => items.quarter === quarter)
    
    // form state (from 'students_sgs' collection)
    const sg_by_quarter = students_sg
        .filter((items) => items.quarter === quarter)

    const formatted_sg_by_quarter = sg_by_quarter
        .map(({ sid: { sid }, ...data }) => ({
            sid,
            ...data
        }))
    
    const form = useForm<StudentSG>({
        resolver: zodResolver(StudentSGSchema),
        defaultValues: {
            student_sg: formatted_sg_by_quarter
        }
    })

    // compare if the subject grade from 'student_qas' is different from 'student_sgs' collection
    const changedValues = sg_by_quarter.length !== 0
        ? getChangedSG(sg_from_qa_by_quarter, form.getValues("student_sg"))
        : []

    const isChanged = useMemo(() => changedValues.length > 0, [changedValues])
    
    useEffect(() => {
        if (isChanged) {
            toast.info('There are some changes')
        }
    }, [isChanged])
    
    function onSubmit(values: StudentSG) {
        if (students_sg.length === 0) {
            toast.error('There is no data')
        } else {
            const isSGZero = students_sg_from_qa.every(item => item.subj_grade === 0)
    
            if (!isSGZero) {
                if (changedValues.length === 0) {
                    // console.log(values)
                    toast.warning('There are no changes')
                } else {
                    updateSGfromQA.mutateAsync(values.student_sg)
                    toast.success('Subject grade re-submitted')
                }
            } else {
                updateSGfromQA.mutateAsync(values.student_sg)
                // console.log(values.student_sg)
                toast.success('Subject grade submitted')
            }
        }
    }

    function onError(errors: any) { 
        console.log("Form errors:", errors) 
    }

    return (
        <div className="space-y-4">
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                        <Button 
                            type="submit"
                            variant={'navy'}
                            disabled={sg_by_quarter.length === 0}
                        >
                            {updateSGfromQA.isPending
                                ? <>Processing<LoaderCircle className="animate-spin"/></>
                                : teacher_role !== 'homeroom'
                                    ? 'Submit to homeroom'
                                    : <>Submit to Evaluation<Check /></>
                            }
                        </Button>
                    </form>
                </Form>
            </div>
            <div>
                <DataTable columns={columns} data={sg_by_quarter}/>
            </div>
        </div>
    )
}
