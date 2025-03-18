import { useMyTasks, useStudentsTakingMyTasks } from "@/hooks/useTaskQuery"
import { TaskTypes, QuarterTypes, SubjectTypes } from "@/types/global.types"
import { getWeightWithProject, getWeightWithoutProject } from "@/helpers/get-weight"
import { findProject } from "@/helpers/is-there-a-project"
import { useEffect } from "react"

export const Procedures = ({ section_assigned, subject_handled, grade_assigned, setWeight, quarter }: {
    section_assigned: string
    subject_handled: SubjectTypes
    grade_assigned: string
    weight: number
    setWeight: (weight: number) => void
    quarter: QuarterTypes
}) => {
    const { countTask } = useMyTasks()
    const { data: students_taking_my_tasks } = useStudentsTakingMyTasks()   // gets all teacher's students taking his/her tasks

    const isThereAProject = findProject(students_taking_my_tasks, grade_assigned, section_assigned, subject_handled)

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
        { name: 'Exam', type: 'exam', quarter: quarter, weight: getTheWeight('exam', quarter) },
        { name: 'Summative', type: 'summative', quarter: quarter, weight: getTheWeight('summative', quarter) },
        { name: 'Quizzes', type: 'quiz', quarter: quarter, weight: getTheWeight('quiz', quarter) },
        { name: 'Activities', type: 'activity', quarter: quarter, weight: getTheWeight('activity', quarter) },
        { name: 'Recitations', type: 'recitation', quarter: quarter, weight: getTheWeight('recitation', quarter) },
        { name: 'Projects', type: 'project', quarter: quarter, weight: getTheWeight('project', quarter) }
    ]

    const sumOfWeight = procedures.reduce((accu, curr) => accu + curr.weight, 0)
    
    useEffect(() => {
        setWeight(sumOfWeight)
        // console.log(sumOfWeight)
    }, [sumOfWeight])

    return (
        <div className="border p-5 rounded-md space-y-4 w-[15rem] h-fit">
            <div className="text-navy border-b pb-4">Grading Procedures:</div>
            <div className="border-b pb-4 space-y-4">
                {procedures.map(({ name, type, quarter, weight }, index) => (
                    <div key={index} className="flex gap-4">
                        <div className="text-gray-500">
                            {countTask(type, subject_handled, section_assigned, quarter)}
                        </div>
                        <div className="text-navy">
                            {name}
                        </div>
                        <div className="ms-auto text-gray-500">
                            {countTask(type, subject_handled, section_assigned, quarter) > 0 
                                ? weight 
                                : 0
                            }&nbsp;%
                        </div>
                    </div>
                ))}
            </div>
            <div className="space-y-4">
                <div className="flex items-end text-navy">
                    <div>
                        Total Weight:
                    </div>
                    <div className="ms-auto text-gray-500 text-xl">
                        {sumOfWeight}&nbsp;%
                    </div>
                </div>
                <div className="text-gray-500 text-xs">
                    * You can only save the grade if the total weight reaches 100 %
                </div>
            </div>
            {/* <div>{sumOfWeight === 100 ? 'All required tasks complete' : 'Some tasks are still missing'}</div> */}
        </div>
    )
}
