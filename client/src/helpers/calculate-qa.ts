import { StudentQA } from "@/types/computation.types";
import { SubjectTypes } from "@/types/global.types";


export function calculateQA(data: StudentQA[], subject: SubjectTypes) {
    const countExistedQA = data.filter(item => item[subject] !== 0).length
    if (countExistedQA !== 4) {
        return 0
    } else {
        const student_qa = data
            .map(item => ({ [subject]: item[subject] }))

        const sg_average = student_qa.reduce((sum, curr) => sum + curr[subject], 0)

        return sg_average / 4
    }
}