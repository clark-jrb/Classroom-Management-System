import { StudentQA } from "@/types/computation.types";
import { api } from "./api";
import { Message } from "@/types/global.types";

/**
 * Mutation function to update student profile
 */

export const updateStudentProfile = async (
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

/**
 * Mutation function to fetch student's quarterly average (quarter 1 to 4)
 */

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