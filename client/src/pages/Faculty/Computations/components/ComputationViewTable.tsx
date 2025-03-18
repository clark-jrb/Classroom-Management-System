import { useStudentsPerformance } from "@/hooks/useTaskQuery"
import { QuarterTypes, SubjectTypes } from "@/types/global.types"
import { useForm } from "react-hook-form"
import { 
    Form
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { StudentSGSchema } from "@/schemas/computation.schema"
import { StudentSG } from "@/types/computation.types"
import { Button } from "@/components/ui/button"
import { useStudentsPerformanceMutations } from "@/hooks/useTaskQuery"
import { useStudentsSG } from "@/hooks/useTaskQuery"
import { getChangedSG } from "@/helpers/changed-fields"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useMemo } from "react"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { ArrowUp, LoaderCircle, Save } from "lucide-react"

export const ComputationViewTable = ({ section, subject, weight, quarter }: {
    section: string
    subject: SubjectTypes
    weight: number
    quarter: QuarterTypes
}) => {
    const queryClient = useQueryClient()
    const { updateSG, generateStudentSG } = useStudentsPerformanceMutations()
    const { data: students_sg } = useStudentsSG(section, subject)
    const { data: students_performance } = useStudentsPerformance(section, subject, quarter)

    const calculated_sp = students_performance
        .map(({ sid, average }) => ({
            sid,
            section,
            subject,
            subj_grade: average,
            quarter: quarter
        }))

    const sg_by_quarter = students_sg
        .filter((items) => items.quarter === quarter)

    const form = useForm<StudentSG>({
        resolver: zodResolver(StudentSGSchema),
        defaultValues: {
            student_sg: calculated_sp
        }
    })

    const changedValues = sg_by_quarter.length !== 0 
        ? getChangedSG(sg_by_quarter, calculated_sp) 
        : []

    const isChanged = useMemo(() => changedValues.length > 0, [changedValues])

    // executes this code when something changed that is subject to update
    useEffect(() => {
        if (isChanged) {
            toast.info('There are some changes')
        }
    }, [isChanged])
    
    function onSubmit(values: StudentSG) {
        // A condition where should the values submitted update or create?
        if (sg_by_quarter.length > 0) {
            if (changedValues.length === 0) {
                toast.warning('There are no changes')
            } else {
                updateSG.mutateAsync(
                    {
                        value: changedValues,
                        subject,
                        quarter
                    }, 
                    {
                        onSuccess: (data) => {
                            const { message } = data
                            toast.success(message)
                            refetchData()
                        },
                        onError: (error) => {
                            console.log(error)
                            toast.error('There is an error updating students subject grade')
                        }
                    }
                )
                // console.log(changedValues)
            }
        } else {
            generateStudentSG.mutateAsync(values.student_sg, {
                onSuccess: (data) => {
                    const { message } = data
                    // console.log(message)
                    toast.success(message)
                    refetchData()
                },
                onError: (error) => {
                    console.log('Error: ' + error)
                    toast.error('There is an error generating students subject grade')
                }
            })
        }
    }

    function onError(errors: any) { 
        console.log("Form errors:", errors) 
    }

    function refetchData() {
        queryClient.invalidateQueries({ queryKey: ['students_subject_grade', section, subject] })
    }

    // executes this code when students_performance changes
    useEffect(() => {
        if (students_performance) {
            form.reset({ student_sg: calculated_sp })
        }
    }, [students_performance])

    return (
        <div className="flex-1 space-y-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                    <Button 
                        type="submit"
                        variant={'navy'}
                        disabled={weight !== 100}
                        className="flex gap-2 items-center"
                    >
                        {updateSG.isPending || generateStudentSG.isPending
                            ? <>Processing<LoaderCircle className="animate-spin"/></>
                            : sg_by_quarter.length > 0
                                ? <>Update Subject Grade<ArrowUp /></>
                                : <>Save Subject Grade<Save /></>
                        }
                    </Button>
                </form>
            </Form>
            <DataTable columns={columns} data={students_performance} />
            
        </div>
    )
}
