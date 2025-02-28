import { api } from "./api";
import { Message } from "@/types/global.types"
import { MyStudents } from "@/types/teacher.types";

export const getMyStudents = async (
    gradeLevel: string, section: string
): Promise<MyStudents[]> => {
    try {
        const response = await api.get(`/my_students`, {
            params: {
                gradeLevel,
                section
            },
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Failed to get my students')
    }
}

export const updateTeacherProfile = async (
    id: string, value: Record<string, any>
): Promise<Message> => {
    try {
        const response = await api.patch(`/teacher/${id}`, value, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Failed to update teacher profile')
    }
}
