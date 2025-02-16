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
import { useStudentsCalculatedQA, useStudentsGA, useStudentsGAMutations } from "@/hooks/useTaskQueries"
import { studentGASchema } from "@/schemas/computationSchemas"
import { StudentGA } from "@/types/computationTypes"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import "@/styles/computation_styles.scss"

export const GATable = ({ section, grade_assigned }: {
    section: string
    grade_assigned: string
}) => {
    const queryClient = useQueryClient()
    const { data: students_calculated_qa } = useStudentsCalculatedQA(grade_assigned, section)    // student_qas collection (calculated on server)
    const { data: students_ga } = useStudentsGA(section)    // students_gas collection
    const { generateGeneralAverage } = useStudentsGAMutations()     // generate mutation

    const student_ga_template = students_calculated_qa.map(({ sid, calculated_qa: { math, mapeh, science, english, filipino, hekasi } }) => ({
        sid,
        section,
        grade_level: grade_assigned,
        math,
        science,
        filipino,
        hekasi,
        english,
        mapeh,
        ga: (math + science + filipino + hekasi + english + mapeh) / 6
    }))

    
    const form = useForm<StudentGA>({
        resolver: zodResolver(studentGASchema),
        defaultValues: {
            student_ga: student_ga_template
        }
    })

    function onSubmit(values: StudentGA) {
        console.log(values)
        generateGeneralAverage.mutateAsync(values.student_ga, {
            onSuccess: (data) => {
                const { message } = data
                console.log(message)
                queryClient.invalidateQueries({ queryKey: ['students_ga', section] })
            },
            onError: (error) => {
                console.log(error)
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
        const get_ga = students_ga.find(data => data.sid === sid)?.ga // returns number
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
                            calculated_qa
                        }) => {
                            const general_average = getRemarksAndGA(sid).general_average
                            const remarks = getRemarksAndGA(sid).remarks
                            
                            return (
                                <TableRow key={sid}>
                                    <TableCell className="font-medium text-base">{lastname}</TableCell>
                                    <TableCell>{firstname}</TableCell>
                                    <TableCell>{calculated_qa.science.toFixed(0)}</TableCell>
                                    <TableCell>{calculated_qa.math.toFixed(0)}</TableCell>
                                    <TableCell>{calculated_qa.english.toFixed(0)}</TableCell>
                                    <TableCell>{calculated_qa.filipino.toFixed(0)}</TableCell>
                                    <TableCell>{calculated_qa.mapeh.toFixed(0)}</TableCell>
                                    <TableCell>{calculated_qa.hekasi.toFixed(0)}</TableCell>
                                    <TableCell className={`${remarks}`}>{general_average}</TableCell>
                                </TableRow>
                        )})}
                    </TableBody>
                </Table>
            </div>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                        <Button type="submit" disabled={students_ga.length > 0}>
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
