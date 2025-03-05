import { api } from "./api"
import { CurrentQuarter, Message } from "@/types/global.types"

export const getCurrentQuarter = async (): Promise<CurrentQuarter> => {
    try {
        const response = await api.get('/current_quarter', {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Error logging in')
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
        throw new Error('Error logging in')
    }
}

export const getStudents = async (): Promise<CurrentQuarter> => {
    try {
        const response = await api.get('/students', {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Error logging in')
    }
}