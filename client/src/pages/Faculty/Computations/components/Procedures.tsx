import { useMyTasks, useStudentsTakingMyTasks } from "@/hooks/useTaskQueries"
import { TaskTypes, QuarterTypes, SubjectTypes } from "@/types/types"
import { getWeightWithProject, getWeightWithoutProject } from "@/helpers/get-weight"

export const Procedures = ({ section_assigned, subject_handled }: {
    section_assigned: string,
    subject_handled: SubjectTypes
}) => {
    const { countTask } = useMyTasks()
    const { data: students_taking_my_tasks } = useStudentsTakingMyTasks()   // gets all teacher's students taking his/her tasks

    const isThereAProject = students_taking_my_tasks.filter((item) => item.task_id.type === 'project').length > 0

    function getWeight(type: TaskTypes) {
        return isThereAProject ? getWeightWithProject(type) : getWeightWithoutProject(type)
    }

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
                    {countTask(type, subject_handled, section_assigned, quarter)}&nbsp;
                    {name}
                    &nbsp;-&nbsp;
                    {countTask(type, subject_handled, section_assigned, quarter) > 0 ? 
                        getWeight(type) : 0}&nbsp;%
                </div>
            ))}
        </div>
    )
}
