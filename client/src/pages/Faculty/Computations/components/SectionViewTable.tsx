import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useStudentsPerformance } from "@/hooks/useTaskQueries"
import { SubjectTypes } from "@/types/types"
import { useQuarterStore } from "@/stores/filterSlice"
import { useForm } from "react-hook-form"
import { 
    Form
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { studentGWASchema } from "@/schemas/computationSchemas"
import { StudentGWA } from "@/types/computationTypes"
import { Button } from "@/components/ui/button"

export const SectionViewTable = ({ section, subject }: {
    section: string
    subject: SubjectTypes
}) => {
    const { quarter } = useQuarterStore()
    const { data: students_performance } = useStudentsPerformance(section, subject, quarter)

    const students_gwas = students_performance.map(({ sid, recitation, activity, quiz, project, summative, exam }) => ({
        sid,
        section,
        subject,
        gwa: (recitation + activity + quiz + project + summative + exam) || 0,
        quarter: quarter
    }))

    console.log(students_gwas)

    const form = useForm<StudentGWA>({
        resolver: zodResolver(studentGWASchema),
        defaultValues: {
            student_gwa: students_gwas
        }
    })
    
    function onSubmit(values: StudentGWA) {
        console.log(values)
        // console.log(students_gwas)
    }

    function onError(errors: any) { 
        console.log("Form errors:", errors) 
    }

    return (
        <div className="flex-1 border rounded-md">
            <Table>
                <TableCaption>A list of my students.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Last Name</TableHead>
                        <TableHead className="w-[150px]">First Name</TableHead>
                        <TableHead>Recitation</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead>Quiz</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Summative</TableHead>
                        <TableHead>Exam</TableHead>
                        <TableHead>GWA</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students_performance.map(({
                        sid,
                        firstname,
                        lastname,
                        recitation,
                        activity,
                        quiz,
                        project,
                        summative,
                        exam
                    }) => (
                        <TableRow key={sid}>
                            <TableCell className="font-medium text-base">{lastname}</TableCell>
                            <TableCell>{firstname}</TableCell>
                            <TableCell>{recitation ? recitation.toFixed(2) : 0}</TableCell>
                            <TableCell>{activity ? activity.toFixed(2) : 0}</TableCell>
                            <TableCell>{quiz ? quiz.toFixed(2) : 0}</TableCell>
                            <TableCell>{project ? project.toFixed(2) : 0}</TableCell>
                            <TableCell>{summative ? summative.toFixed(2) : 0}</TableCell>
                            <TableCell>{exam ? exam.toFixed(2) : 0}</TableCell>
                            <TableCell>
                                {(
                                    recitation + 
                                    activity +
                                    quiz +
                                    project +
                                    summative +
                                    exam
                                ).toFixed(1) || 0}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                    <Button 
                        type="submit" 
                        onClick={() => {
                            students_gwas.forEach(({ gwa }, index) => {
                                form.setValue(`student_gwa.${index}.gwa`, gwa)
                            })
                        }}
                    >
                        Save
                    </Button>
                </form>
            </Form>
        </div>
    )
}
