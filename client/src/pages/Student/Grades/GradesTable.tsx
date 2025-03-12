import { toCamelCase } from "@/helpers/camel-case"
import { useStudentQAs, useStudentGA } from "@/hooks/useStudentQuery"
import { useAuthStore } from "@/stores/auth/authSlice"
import { SubjectTypes } from "@/types/global.types"

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
        <div className="flex-1 flex">
            <div className="flex-col w-[15rem]">
                <div className="text-gray-500 border-y border-l rounded-tl-md h-[5rem] flex justify-center items-center">
                    Learning Areas
                </div>
                {subjects.map((item, index) => (
                    <div key={index} className="border-b border-l p-3 flex justify-center items-center">{toCamelCase(item)}</div>
                ))}
                <div className="border-b border-l rounded-bl-md p-3 flex justify-center items-center">&nbsp;</div>
            </div>
            <div>
                <div className="border-b h-[5rem]">
                    <div className="text-gray-500 h-[2.5rem] border-y border-l flex justify-center items-center">Quarters</div>
                    <div className="text-gray-500 flex h-[2.5rem]">
                        {[1, 2, 3, 4].map(num => (
                            <div key={num} className="border-b border-l w-14 flex justify-center items-center">{num}</div>
                        ))}
                    </div>
                </div>
                <div className="flex">
                    {student_qa.map((data) => (
                        <div className="flex-col w-14" key={data._id}>
                            {/* <div className="border-b border-l p-3">{data.quarter}</div> */}
                            {subjects.map((item, index) => (
                                <div key={index} className="border-b border-l p-3">
                                    {data[item] === 0 
                                        ? '--' 
                                        : data[item].toFixed(0)
                                    }
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="text-gray-500 border-b p-3 flex justify-end items-center">
                    General Average
                </div>
            </div>
            <div className="w-20">
                <div className="text-gray-500 border-y border-l p-3 h-[5rem] flex justify-center items-center">Final <br/> Grade</div>
                    {subjects.map((item, index) => (
                        <div key={index} className="border-b border-l p-3">
                            {student_ga && student_ga[item] > 0 
                                ? student_ga[item].toFixed(0) 
                                : '--'
                            }
                        </div>
                    ))}
                <div className="border-b border-l p-3">
                    {student_ga && student_ga.general_ave.toFixed(0) || '--'}
                </div>
            </div>
            <div className="w-32">
                <div className="text-gray-500 border rounded-tr-md p-3 h-[5rem] flex justify-center items-center">Remarks</div>
                    {subjects.map((item, index) => (
                        <div key={index} className="border-b border-x p-3">
                            {student_ga && passOrFail(student_ga[item]) || '--'}
                        </div>
                    ))}
                <div className="border-b border-r rounded-br-md p-3">
                    {student_ga && passOrFail(student_ga.general_ave) || '--'}
                </div>
            </div>
        </div>
    )
}
