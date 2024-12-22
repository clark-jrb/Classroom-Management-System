import { taskFunctions } from "@/hooks/useTaskQueries"
import { TaskTypes, QuarterTypes } from "@/types/types"

export const Procedures = ({ section_assigned }: {
    section_assigned: string,
    // subject_handled: SubjectTypes
}) => {
    const { countTask } = taskFunctions()

    const procedures: {
        name: string
        type: TaskTypes,
        quarter: QuarterTypes
    }[] = [
        { name: 'Exam', type: 'exam', quarter: 'q1' },
        { name: 'Summative', type: 'summative', quarter: 'q1' },
        { name: 'Quizzes', type: 'quiz', quarter: 'q1' },
        { name: 'Activities', type: 'activity', quarter: 'q1' },
        { name: 'Recitations', type: 'recitation', quarter: 'q1' },
        { name: 'Projects', type: 'project', quarter: 'q1' }
    ]

    return (
        <div className="border p-5 rounded-md space-y-4">
            <div>Grading Procedures:</div>
            {procedures.map(({ name, type, quarter }, index) => (
                <div key={index}>
                    {countTask(type, 'science', section_assigned, quarter)} {name} - %
                </div>
            ))}
        </div>
    )
}
