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
import { useStudentsCalculatedGPA, useStudentsGAMutations } from "@/hooks/useTaskQueries"
import { studentGASchema } from "@/schemas/computationSchemas"
import { StudentGA } from "@/types/computationTypes"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export const GATable = ({ section, grade_assigned }: {
    section: string
    grade_assigned: string
}) => {
    const { data: students_gpas } = useStudentsCalculatedGPA(grade_assigned, section)
    const { createGA } = useStudentsGAMutations()

    const calculated_students_gpas = students_gpas.map(({ sid, gpa: { math, mapeh, science, english, filipino, hekasi } }) => ({
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

    // console.log(calculated_students_gpas)

    const form = useForm<StudentGA>({
        resolver: zodResolver(studentGASchema),
        defaultValues: {
            student_ga: calculated_students_gpas
        }
    })

    function onSubmit(values: StudentGA) {
        console.log(values)
        createGA(values.student_ga)
    }

    function onError(errors: any) { 
        console.log("Form errors:", errors) 
    }

    useEffect(() => {
        if (calculated_students_gpas) {
            form.reset({ student_ga: calculated_students_gpas })
        }
    }, [students_gpas])

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
                        {students_gpas.map(({
                            sid,
                            firstname,
                            lastname,
                            gpa
                        }) => (
                            <TableRow key={sid}>
                                <TableCell className="font-medium text-base">{lastname}</TableCell>
                                <TableCell>{firstname}</TableCell>
                                <TableCell>{gpa.science.toFixed(0)}</TableCell>
                                <TableCell>{gpa.math.toFixed(0)}</TableCell>
                                <TableCell>{gpa.english.toFixed(0)}</TableCell>
                                <TableCell>{gpa.filipino.toFixed(0)}</TableCell>
                                <TableCell>{gpa.mapeh.toFixed(0)}</TableCell>
                                <TableCell>{gpa.hekasi.toFixed(0)}</TableCell>
                                <TableCell>--</TableCell>
                                <TableCell>--</TableCell>
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
