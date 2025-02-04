import { StudentGPA } from "@/types/computationTypes";
import { api } from "./api";
import { Message } from "@/types/types";

export const updateStudentInfo = async (
    id: string, value: Record<string, any>
): Promise<Message> => {
    try {
        const response = await api.patch(`/student/${id}`, value, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Failed to update student profile')
    }
}

export const getStudentGPAs = async (
    sid: string
): Promise<StudentGPA[]> => {
    try {
        const response = await api.get(`/student/gpa/${sid}`, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Failed to get student gpas')
    }
}