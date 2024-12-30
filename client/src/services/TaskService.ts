import { api } from "./api";
import { StudentScore } from "@/types/types";
import { TTasks, TTaskForm, Message, StudentTask, StudentTaskCreate, SpecStudentTask } from "@/types/types";

export const createTask = async (
    tid: string, 
    value: TTaskForm
): Promise<{task: TTasks} & Message> => {
    try {
        const response = await api.post(`/task/${tid}`, value, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to create a new task', error)
        throw new Error('Failed to create a new task')
    }
}

export const getTasks = async (
    filters: Record<string, string | string[]>
): Promise<TTasks[]> => {
    try {
        const query = new URLSearchParams(filters as Record<string, string>).toString()
        // console.log(query)
        const response = await api.get(`/tasks?${query}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to get tasks', error)
        throw new Error('Failed to get tasks')
    }
}

export const createTasksToStudents = async (
    value: StudentTaskCreate
): Promise<Message> => {
    try {
        const response = await api.post(`/task/students`, value, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to create student tasks', error)
        throw new Error('Failed to create student tasks')
    }
}

export const getStudentsTakingTask = async (
    task_id: string, 
    grade_lvl: string
): Promise<StudentTask[]> => {
    try {
        const response = await api.get(`/students/task`, {
            params: {
                task_id,
                grade_lvl
            },
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to get students tasks', error)
        throw new Error('Failed to get students tasks')
    }
}

export const updateStudentsScores = async (
    value: StudentScore["student_scores"], 
    grade_lvl: string
): Promise<Message> => {
    try {
        const response = await api.patch(`/students/scores`, value, {
            params: {
                grade_lvl
            },
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to update student scores user', error)
        throw new Error('Failed to update student scores user')
    }
}

export const getStudentsTakingMyTasks = async (
    tid: string, 
    grade_lvl: string
): Promise<SpecStudentTask[]> => {
    try {
        const response = await api.get(`/students/my_tasks`, {
            params: {
                tid,
                grade_lvl
            },
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to get student tasks', error)
        throw new Error('Failed to get student tasks')
    }
}