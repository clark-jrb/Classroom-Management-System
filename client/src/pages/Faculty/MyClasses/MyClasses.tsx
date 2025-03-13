import { teacherClassInfo } from "@/hooks/useTeacherQuery"
import { Suspense, useState } from "react"
import { MyStudentsTable } from "./components/MyStudentsTable"
import { LoaderCircle, UsersRound } from "lucide-react"
import { getGradeName } from "@/helpers/get-quarter"
import { toCamelCase } from "@/helpers/camel-case"

export const MyClasses = () => {
    const { section_handled, grade_assigned } = teacherClassInfo()
    const [view, setView] = useState(false)
    const [section, setSection] = useState('')
    const [gradeLevel, setGradeLevel] = useState('')

    return (
        <>
        {!view &&
            <div className="space-y-4 flex-1">
                {section_handled.map((section, index) => (
                    <div 
                        key={index} 
                        className="border p-4 rounded-md cursor-pointer w-[15rem] hover:shadow-md transition duration-300" 
                        onClick={() => {
                            setView(true)
                            setSection(section)
                            setGradeLevel(grade_assigned)
                        }}
                    >
                        <div className="flex gap-2 text-navy">
                            <span className="text-lg">
                                {getGradeName(grade_assigned)}
                            </span>
                            <UsersRound strokeWidth={1} className="ms-auto"/>
                        </div>
                        <div className="text-navy text-2xl font-semibold">
                            {toCamelCase(section)}
                        </div>
                    </div>
                ))}
            </div>
        }
        {view &&
            <div className="space-y-4 flex-1">
                <Suspense fallback={
                    <div className="h-full w-full flex justify-center items-center">
                        <LoaderCircle className="animate-spin" color="gray" size={'3rem'}/>
                    </div>
                }>
                    <MyStudentsTable 
                        section={section} 
                        grade_level={gradeLevel}
                        setView={setView}
                    />
                </Suspense>
            </div>
        }
        </>
    )
}