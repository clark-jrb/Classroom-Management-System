import { useMyTasks, useStudentsTakingMyTasks } from "@/hooks/useTaskQueries"
import { TaskTypes, QuarterTypes, SubjectTypes } from "@/types/types"
import { getWeightWithProject, getWeightWithoutProject } from "@/helpers/get-weight"

export const Procedures = ({ section_assigned, subject_handled, grade_assigned }: {
    section_assigned: string,
    subject_handled: SubjectTypes,
    grade_assigned: string
}) => {
    const { countTask } = useMyTasks()
    const { data: students_taking_my_tasks } = useStudentsTakingMyTasks()   // gets all teacher's students taking his/her tasks

    const isThereAProject = students_taking_my_tasks.filter((item) => 
            item.task_id.type === 'project' &&
            item.task_id.grade === grade_assigned &&
            item.task_id.section === section_assigned
        ).length > 0

    function getWeight(type: TaskTypes) {
        return isThereAProject ? getWeightWithProject(type) : getWeightWithoutProject(type)
    }

    function getTheWeight(type: TaskTypes, quarter: QuarterTypes) {
        return countTask(type, subject_handled, section_assigned, quarter) > 0 ? getWeight(type) : 0
    }

    const procedures: {
        name: string
        type: TaskTypes
        quarter: QuarterTypes
        weight: number
    }[] = [
        { name: 'Exam', type: 'exam', quarter: 'q1', weight: getTheWeight('exam', 'q1') },
        { name: 'Summative', type: 'summative', quarter: 'q1', weight: getTheWeight('summative', 'q1') },
        { name: 'Quizzes', type: 'quiz', quarter: 'q1', weight: getTheWeight('quiz', 'q1') },
        { name: 'Activities', type: 'activity', quarter: 'q1', weight: getTheWeight('activity', 'q1') },
        { name: 'Recitations', type: 'recitation', quarter: 'q1', weight: getTheWeight('recitation', 'q1') },
        { name: 'Projects', type: 'project', quarter: 'q1', weight: getTheWeight('project', 'q1') }
    ]

    const sumOfWeight = procedures.reduce((accu, curr) => accu + curr.weight, 0)

    return (
        <div className="border p-5 rounded-md space-y-4">
            <div>Grading Procedures:</div>
            {procedures.map(({ name, type, quarter, weight }, index) => (
                <div key={index}>
                    {countTask(type, subject_handled, section_assigned, quarter)}&nbsp;
                    {name}
                    &nbsp;-&nbsp;
                    {countTask(type, subject_handled, section_assigned, quarter) > 0 ? 
                        weight : 0}&nbsp;%
                </div>
            ))}
            <div>Total Weight: <br />{sumOfWeight}</div>
            {/* <div>{sumOfWeight === 100 ? 'All required tasks complete' : 'Some tasks are still missing'}</div> */}
        </div>
    )
}
