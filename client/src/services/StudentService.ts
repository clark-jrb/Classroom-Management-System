import { StudentGPA } from "@/types/computationTypes";
import { api } from "./api";

export const updateStudentInfo = async (id: string, value: Record<string, any>): Promise<any> => {
    try {
        const response = await api.patch(`/student/${id}`, value, {
            withCredentials: true
        })
        return response
    } catch (error) {
        console.log('Failed to fetch current user', error)
    }
}

export const getStudentGPAs = async (sid: string): Promise<StudentGPA[]> => {
    try {
        const response = await api.get(`/student/gpa/${sid}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to get student gpas', error)
        throw new Error('Failed to get student gpas')
    }
}