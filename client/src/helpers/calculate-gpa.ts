import { StudentGPA } from "@/types/computationTypes";
import { SubjectTypes } from "@/types/types";


export function calculateGPA(data: StudentGPA[], subject: SubjectTypes) {
    const countSubmittedGPA = data.filter(item => item[subject] !== 0).length
    if (countSubmittedGPA !== 4) {
        return 0
    } else {
        const subjectGPA = data
            .map(item => ({ [subject]: item[subject] }))

        const totalGPA = subjectGPA.reduce((sum, curr) => sum + curr[subject], 0)

        return totalGPA / 4
    }
}