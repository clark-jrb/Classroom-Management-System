import { StudentInformation } from "@/types/StudentTypes";
import { api } from "./api";
import { TeacherInformation } from "@/types/TeacherTypes";
import { CurrentUser } from "@/types/types";

export const getCurrentUser = async ():
Promise<CurrentUser> => {
    try {
        const response = await api.get(`/authenticated`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to fetch current user', error)
        throw new Error('Failed to fetch current user')
    }
}

export const getStudentInformation = async (
    id: string
): Promise<StudentInformation> => {
    try {
        const response = await api.get(`/student/${id}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to fetch student information', error)
        throw new Error('Failed to get students tasks')
    }
}

export const getTeacherInformation = async (
    id: string
): Promise<TeacherInformation> => {
    try {
        const response = await api.get(`/teacher/${id}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to fetch teacher information', error)
        throw new Error('Failed to get students tasks')
    }
}