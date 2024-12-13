import { useParams } from "react-router-dom"
import { getStudentTask } from "@/services/TaskService"
import { useSuspenseQuery } from "@tanstack/react-query"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


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

    type Task = {
        total_items: number
    }

    type StudentInfo = {
        firstname: string,
        lastname: string
    }

    type StudentTask = {
        score: number,
        sid: StudentInfo,
        task_id: Task
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of students scores.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Last Name</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Total Items</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.map(({
                        score,
                        sid: { firstname, lastname },
                        task_id: { total_items }
                    }: StudentTask, index: number) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{lastname}</TableCell>
                            <TableCell>{firstname}</TableCell>
                            <TableCell>{score}</TableCell>
                            <TableCell>{total_items}</TableCell>
                        </TableRow>
                    ))}
                    
                </TableBody>
            </Table>

        </div>
    )
}
