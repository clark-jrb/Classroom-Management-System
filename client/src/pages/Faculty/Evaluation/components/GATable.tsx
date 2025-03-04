import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useStudentsCalculatedQA, useStudentsGA, useStudentsGAMutations } from "@/hooks/useTaskQuery"
import { StudentGASchema } from "@/schemas/computation.schema"
import { StudentGA } from "@/types/computation.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import "@/styles/computation_styles.scss"
import { toast } from "sonner"
import { DialogClose } from "@radix-ui/react-dialog"
import { useCurrentQuarterStore } from "@/stores/globalSlice"

export const GATable = ({ section, grade_assigned }: {
    section: string
    grade_assigned: string
}) => {
    const queryClient = useQueryClient()
    const { current_quarter } = useCurrentQuarterStore()
    const { data: students_calculated_qa } = useStudentsCalculatedQA(grade_assigned, section)    // student_qas collection (calculated on server)
    const { data: students_ga } = useStudentsGA(section)    // students_gas collection
    const { generateGeneralAverage } = useStudentsGAMutations()     // generate mutation
    const [openDialog, setOpenDialog] = useState(false)

    const student_ga_template = students_calculated_qa.map(({ sid, total_qa: { math, mapeh, science, english, filipino, hekasi } }) => ({
        sid,
        section,
        grade_level: grade_assigned,
        math,
        science,
        filipino,
        hekasi,
        english,
        mapeh,
        general_ave: (math + science + filipino + hekasi + english + mapeh) / 6
    }))
    
    const form = useForm<StudentGA>({
        resolver: zodResolver(StudentGASchema),
        defaultValues: {
            student_ga: student_ga_template
        }
    })

    function onSubmit(values: StudentGA) {
        // console.log(values)
        generateGeneralAverage.mutateAsync(values.student_ga, {
            onSuccess: (data) => {
                const { message } = data
                // console.log(message)
                setOpenDialog(false)
                queryClient.invalidateQueries({ queryKey: ['students_ga', section] })
                toast.success(message)
            },
            onError: (error) => {
                console.log(error)
                toast.error('Failed to submit students general average')
            }
        })
    }
    
    function onError(errors: any) { 
        console.log("Form errors:", errors) 
    }

    useEffect(() => {
        if (student_ga_template) {
            form.reset({ student_ga: student_ga_template })
        }
    }, [students_calculated_qa])
    
    const getRemarksAndGA = (sid: string) => {
        const get_ga = students_ga.find(data => data.sid === sid)?.general_ave // returns number
        const remarks = !get_ga 
            ? '--'
            : get_ga && get_ga >= 75
                ? 'passed'
                : 'failed'

        const general_average = get_ga?.toFixed(0) // returns string

        return { general_average, remarks }
    }
    
    return (
        <div>
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
                        {students_calculated_qa.map(({
                            sid,
                            firstname,
                            lastname,
                            total_qa
                        }) => {
                            const general_average = getRemarksAndGA(sid).general_average
                            const remarks = getRemarksAndGA(sid).remarks
                            
                            return (
                                <TableRow key={sid}>
                                    <TableCell className="font-medium text-base">{lastname}</TableCell>
                                    <TableCell>{firstname}</TableCell>
                                    <TableCell>{total_qa.science.toFixed(0)}</TableCell>
                                    <TableCell>{total_qa.math.toFixed(0)}</TableCell>
                                    <TableCell>{total_qa.english.toFixed(0)}</TableCell>
                                    <TableCell>{total_qa.filipino.toFixed(0)}</TableCell>
                                    <TableCell>{total_qa.mapeh.toFixed(0)}</TableCell>
                                    <TableCell>{total_qa.hekasi.toFixed(0)}</TableCell>
                                    <TableCell className={`${remarks}`}>{general_average}</TableCell>
                                </TableRow>
                        )})}
                    </TableBody>
                </Table>
            </div>
            <div>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                        {current_quarter === 'q4' && 
                            <Button type="button" disabled={students_ga.length > 0}>
                                Submit
                            </Button>
                        }
                    </DialogTrigger>
                    <DialogContent className="w-[20rem]">
                        <DialogHeader>
                            <DialogTitle>
                                Are you sure?
                            </DialogTitle>
                            <DialogDescription className="py-4">
                                This action cannot be undone once submitted.
                            </DialogDescription>
                            <div className="ms-auto">
                                <div className="flex space-x-2">
                                    <DialogClose asChild>
                                        <Button type="button" variant={'destructive'}>Cancel</Button>
                                    </DialogClose>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                                            <Button type="submit">
                                                Yes, submit
                                            </Button>
                                        </form>
                                    </Form>
                                </div>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
