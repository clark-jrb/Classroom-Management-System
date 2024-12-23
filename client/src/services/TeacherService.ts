import { api } from "./api";

export const getMyStudents = async (gradeLevel: string, section: string): Promise<any> => {
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
    }
}