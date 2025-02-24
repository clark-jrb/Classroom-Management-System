import { toCamelCase } from "@/helpers/camel-case"
import { useStudentQAs, useStudentGA } from "@/hooks/useStudentQueries"
import { useAuthStore } from "@/stores/auth/authSlice"
import { SubjectTypes } from "@/types/GlobalTypes"

export const GradesTable = () => {
    const { user_id } = useAuthStore()
    const { data: student_qa } = useStudentQAs(user_id)
    const { data: student_ga } = useStudentGA(user_id)

    function passOrFail(grade: number) {
        if (grade > 0) {
            return grade >= 75 ? 'PASSED' : 'FAILED'
        } else {
            return '--'
        }
    }

    const subjects: SubjectTypes[] = ['math', 'science', 'filipino', 'hekasi', 'mapeh', 'english']

    return (
        <div>
            <div>Grades</div>
            <div className="flex">
                <div className="flex-col w-[250px]">
                    <div className="border-b h-[5rem]">Learning Areas</div>
                        {subjects.map((item, index) => (
                            <div key={index} className="border-b p-3">{toCamelCase(item)}</div>
                        ))}
                </div>
                <div>
                    <div className="border-b h-[5rem]">
                        <div className="h-[2.5rem] border-b border-l">Quarters</div>
                        <div className="flex h-[2.5rem]">
                            <div className="border-b border-l w-14">1</div>
                            <div className="border-b border-l w-14">2</div>
                            <div className="border-b border-l w-14">3</div>
                            <div className="border-b border-l w-14">4</div>
                        </div>
                    </div>
                    <div className="flex">
                        {student_qa.map((data) => (
                            <div className="flex-col w-14" key={data._id}>
                                {/* <div className="border-b border-l p-3">{data.quarter}</div> */}
                                {subjects.map((item, index) => (
                                    <div key={index} className="border-b border-l p-3">{
                                        data[item] === 0 ? '--' : data[item].toFixed(0)
                                    }</div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="border-b border-l py-3">
                        General Average
                    </div>
                </div>
                <div className="w-20">
                    <div className="border-b border-l p-3 h-[5rem]">Final <br/> Grade</div>
                        {subjects.map((item, index) => (
                            <div key={index} className="border-b border-l p-3">
                                {student_ga && student_ga[item] > 0 
                                    ? student_ga[item].toFixed(0) 
                                    : '--'
                                }
                            </div>
                        ))}
                    <div className="border-b p-3">
                        {student_ga && student_ga.general_ave.toFixed(0) || '--'}
                    </div>
                </div>
                <div className="w-32">
                    <div className="border-b border-l p-3 h-[5rem]">Remarks</div>
                        {subjects.map((item, index) => (
                            <div key={index} className="border-b border-l p-3">
                                {student_ga && passOrFail(student_ga[item]) || '--'}
                            </div>
                        ))}
                    <div className="border-b p-3">
                        {student_ga && passOrFail(student_ga.general_ave) || '--'}
                    </div>
                </div>
            </div>
        </div>
    )
}
