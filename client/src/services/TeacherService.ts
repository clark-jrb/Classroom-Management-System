import { api } from "./api";
import { MyStudents } from "@/types/types";

export const getMyStudents = async (gradeLevel: string, section: string): Promise<MyStudents[]> => {
    try {
        const query = new URLSearchParams({
            gradeLevel: gradeLevel,
            section: section
        }).toString()

        const response = await api.get(`/my_students?${query}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to fetch current user', error)
        throw new Error('Failed to get my students')
    }
}