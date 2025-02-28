import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
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
import { useTaskMutations, useStudentTasks } from "@/hooks/useTaskQueries"
import { teacherClassInfo } from "@/hooks/useTeacherQueries"
import { toast } from "sonner"
import { StudentScore } from "@/types/TasksTypes"

export const TaskView = () => {
    const { taskId } = useParams()
    const { updateScores } = useTaskMutations()
    const queryClient = useQueryClient()
    const { grade_assigned } = teacherClassInfo()
    
    const { data, isError, error } = useStudentTasks(taskId as string, grade_assigned)
    const { task, student_tasks } = data

    const studentScoresData = student_tasks.map(({ _id, score, sid }) => ({
        _id,
        sid: sid.sid,
        score
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
            updateScores.mutateAsync(getChanges, {
                onSuccess: (data) => {
                    const { message } = data
                    // console.log(message)
                    queryClient.invalidateQueries({ queryKey: ['students_taking_task', taskId, grade_assigned] })
                    toast.success(message)
                },
                onError: (error) => {
                    console.log(error)
                    toast.error("Error updating scores")
                }
            })
        } else {
            toast.warning('There are no changes')
        }
    }

    function onError(errors: any) { 
        console.log("Form errors:", errors) 
    }

    if (isError) {
        console.log(error)

        return <div>There is an error</div>
    }

    return (
        <div>
            <div>
                {task.type}{task.task_no}{task.subject}{task.grade}{task.section}
            </div>
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
                            {student_tasks.map(({
                                sid: { firstname, lastname },
                                task_id: { total_items }
                            }, index: number) => (
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
                    <Button type="submit" disabled={updateScores.isPending}>
                        {updateScores.isPending ? "Processing..." : "Submit"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
