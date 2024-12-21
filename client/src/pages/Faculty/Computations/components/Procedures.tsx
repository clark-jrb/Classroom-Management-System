import { taskFunctions } from "@/hooks/useTaskQueries"
import { TaskTypes, SubjectTypes, QuarterTypes } from "@/types/types"

export const Procedures = () => {
    const { countTask } = taskFunctions()

    const procedures: {
        name: string
        type: TaskTypes,
        subject: SubjectTypes,
        section: string,
        quarter: QuarterTypes
    }[] = [
        { name: 'Exam', type: 'exam', subject: 'science', section: 'sharks', quarter: 'q1' },
        { name: 'Summative', type: 'summative', subject: 'science', section: 'sharks', quarter: 'q1' },
        { name: 'Quizzes', type: 'quiz', subject: 'science', section: 'sharks', quarter: 'q1' },
        { name: 'Activities', type: 'activity', subject: 'science', section: 'sharks', quarter: 'q1' },
        { name: 'Recitations', type: 'recitation', subject: 'science', section: 'sharks', quarter: 'q1' },
        { name: 'Projects', type: 'project', subject: 'science', section: 'sharks', quarter: 'q1' }
    ]

    return (
        <div className="border p-5 rounded-md space-y-4">
            <div>Grading Procedures:</div>
            {procedures.map(({ name, type, subject, section, quarter }, index) => (
                <div key={index}>
                    {countTask(type, subject, section, quarter)} {name} - %
                </div>
            ))}
        </div>
    )
}
