import { useParams } from "react-router-dom"
import { getStudentTask, updateStudentScores } from "@/services/TaskService"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { StudentTask } from "./types"
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
import { z } from "zod"
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

export const TaskView = () => {
    const { taskId } = useParams()
    
    const { data, isLoading, isError, error } = useSuspenseQuery({
        queryKey: ['student_tasks', taskId],
        queryFn: () => getStudentTask(taskId as string)
    })

    if (isLoading) {
        console.log('loading...')
    }

    if (isError) {
        console.log(error)
    }

    // if (data) {
    //     console.log(data)
    // }

    const studentScoresData = data?.map(({ _id, score, sid }: StudentTask) => ({
        _id,
        sid: sid.sid,
        score: score
    }))

    const studentScoreForm = useForm<z.infer<typeof studentScoreSchema>>({
        resolver: zodResolver(studentScoreSchema),
        defaultValues: {
            student_scores: studentScoresData
        }
    })

    const updateStudentScore = useMutation({
        mutationFn: (value: z.infer<typeof studentScoreSchema>["student_scores"]) => 
            updateStudentScores(taskId as string, value),
    })
    
    function onSubmit(values: z.infer<typeof studentScoreSchema>) {
        const getChanges = getChangedScores(studentScoresData, values.student_scores)
        
        if (Object.keys(getChanges).length !== 0) {
            updateStudentScore.mutate(getChanges)
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
                    <Button type="submit">
                        Save
                    </Button>
                </form>
            </Form>
        </div>
    )
}
