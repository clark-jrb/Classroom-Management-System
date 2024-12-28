import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { StudentTask, StudentScore } from "../../../../types/types"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { studentScoreSchema } from "@/schemas/teacherSchemas"
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getChangedScores } from "@/helpers/changed-fields"
import { taskFunctions, useStudentTasks } from "@/hooks/useTaskQueries"
import { teacherInfo } from "@/hooks/useTeacherQueries"

export const TaskView = () => {
    const { taskId } = useParams()
    const { updateStudentScore } = taskFunctions()
    const queryClient = useQueryClient()
    const { grade_assigned } = teacherInfo()
    
    const { data, isLoading, isError, error } = useStudentTasks(taskId as string, grade_assigned)

    if (isLoading) console.log('loading...')
    if (isError) console.log(error)
    // if (data) console.log(data)

    const studentScoresData = data.map(({ _id, score, sid }) => ({
        _id,
        sid: sid.sid,
        score: score
    }))

    const studentScoreForm = useForm<StudentScore>({
        resolver: zodResolver(studentScoreSchema),
        defaultValues: {
            student_scores: studentScoresData
        }
    })
    
    function onSubmit(values: StudentScore) {
        const getChanges = getChangedScores(studentScoresData, values.student_scores)
        
        if (Object.keys(getChanges).length !== 0) {
            updateStudentScore.mutateAsync(getChanges, {
                onSuccess: (data) => {
                    const { message } = data
                    console.log(message)
                    queryClient.invalidateQueries({ queryKey: ['student_tasks'] })
                },
                onError: (error) => {
                    console.log(error)
                }
            })

            console.log(getChanges)
            console.log('updated successfully')
        } else {
            console.log('there is nothing to update')
        }
    }

    function onError(errors: any) { console.log("Form errors:", errors) }

    return (
        <div>
            <Form {...studentScoreForm}>
                <form onSubmit={studentScoreForm.handleSubmit(onSubmit, onError)}>
                    <Table>
                        <TableCaption>A list of students scores.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Last Name</TableHead>
                                <TableHead>First Name</TableHead>
                                <TableHead className="w-[200px]">Score</TableHead>
                                <TableHead>Total Items</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data && data.map(({
                                sid: { firstname, lastname },
                                task_id: { total_items }
                            }: StudentTask, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{lastname}</TableCell>
                                    <TableCell>{firstname}</TableCell>
                                    <TableCell>
                                        <FormField
                                            control={studentScoreForm.control}
                                            name={`student_scores.${index}.score`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input 
                                                            type="number"
                                                            className="w-[150px]"
                                                            placeholder="score"
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                                            min={0}
                                                            max={total_items}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>{total_items}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button type="submit" disabled={updateStudentScore.isPending}>
                        {updateStudentScore.isPending ? "Processing..." : "Save"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
