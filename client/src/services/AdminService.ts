import { StudentData } from "@/types/student.types"
import { api } from "./api"
import { CurrentQuarter, Message, Roles } from "@/types/global.types"
import { TeacherData } from "@/types/teacher.types"

export const getCurrentQuarter = async (): Promise<CurrentQuarter> => {
    try {
        const response = await api.get('/current_quarter', {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Error fetching current quarter')
    }
}

export const updateCurrentQuarter = async (
    id: string,
    value: CurrentQuarter
): Promise<Message> => {
    try {
        const response = await api.patch(
            `/current_quarter/${id}`, 
            value, 
            { withCredentials: true }
        )

        return response.data
    } catch (error) {
        throw new Error('Error updating current quarter')
    }
}

export const getStudents = async (): Promise<StudentData[]> => {
    try {
        const response = await api.get('/students', {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Error fetching students with data')
    }
}

export const getTeachers = async (): Promise<TeacherData[]> => {
    try {
        const response = await api.get('/teachers', {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Error fetching teachers with data')
    }
}

export const deleteUser = async (id: string, role: Roles): Promise<Message> => {
    try {
        const response = await api.delete(`/user/${role}/${id}`, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Error deleting user')
    }
}