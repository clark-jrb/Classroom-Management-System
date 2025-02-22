import { StudentQA } from "@/types/ComputationTypes";
import { api } from "./api";
import { Message } from "@/types/GlobalTypes";

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

export const getStudentQAs = async (
    sid: string
): Promise<StudentQA[]> => {
    try {
        const response = await api.get(`/student/qa/${sid}`, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Failed to get student qas')
    }
}