import { api } from "./api";
import { MyStudents } from "@/types/types";

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