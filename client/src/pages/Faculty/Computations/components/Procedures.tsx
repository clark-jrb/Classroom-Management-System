import { taskFunctions } from "@/hooks/useTaskQueries"

export const Procedures = () => {
    const { countTask } = taskFunctions()

    const quizzes = countTask('recitation', 'science', 'sharks', 'q1')

    console.log(quizzes)

    return (
        <div className="border p-5 rounded-md space-y-4">
            <div>Grading Procedures:</div>
            <div>Exam - %</div>
            <div>Summative - %</div>
            <div>Quiz - %</div>
            <div>Activity - %</div>
            <div>Recitation - %</div>
            <div>Project - %</div>
        </div>
    )
}
