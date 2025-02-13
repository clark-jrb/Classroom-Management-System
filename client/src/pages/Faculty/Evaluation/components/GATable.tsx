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
import { useStudentsCalculatedGPA, useStudentsGA, useStudentsGAMutations } from "@/hooks/useTaskQueries"
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
    const { data: students_gpa } = useStudentsCalculatedGPA(grade_assigned, section)    // student_gpas collection (calculated on server)
    const { data: students_ga } = useStudentsGA(section)    // students_gas collection
    const { generateGeneralAverage } = useStudentsGAMutations()     // generate mutation

    const calculated_students_gpa = students_gpa.map(({ sid, gpa: { math, mapeh, science, english, filipino, hekasi } }) => ({
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
            student_ga: calculated_students_gpa
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
        if (calculated_students_gpa) {
            form.reset({ student_ga: calculated_students_gpa })
        }
    }, [students_gpa])
    
    const getRemarksAndGA = (sid: string) => {
        const get_ga = students_ga.find(data => data.sid === sid)?.ga // returns number
        const remarks = !get_ga 
            ? '--'
            : get_ga && get_ga >= 75
                ? 'PASSED'
                : 'FAILED'

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
                            <TableHead>Remarks</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students_gpa.map(({
                            sid,
                            firstname,
                            lastname,
                            gpa
                        }) => {
                            const general_average = getRemarksAndGA(sid).general_average
                            const remarks = getRemarksAndGA(sid).remarks
                            
                            return (
                                <TableRow key={sid}>
                                    <TableCell className="font-medium text-base">{lastname}</TableCell>
                                    <TableCell>{firstname}</TableCell>
                                    <TableCell>{gpa.science.toFixed(0)}</TableCell>
                                    <TableCell>{gpa.math.toFixed(0)}</TableCell>
                                    <TableCell>{gpa.english.toFixed(0)}</TableCell>
                                    <TableCell>{gpa.filipino.toFixed(0)}</TableCell>
                                    <TableCell>{gpa.mapeh.toFixed(0)}</TableCell>
                                    <TableCell>{gpa.hekasi.toFixed(0)}</TableCell>
                                    <TableCell>{general_average}</TableCell>
                                    <TableCell className={`${remarks}`}>
                                        {remarks}
                                    </TableCell>
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
