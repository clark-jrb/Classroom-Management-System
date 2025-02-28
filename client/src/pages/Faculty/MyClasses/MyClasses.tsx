import { Button } from "@/components/ui/button"
import { teacherClassInfo } from "@/hooks/useTeacherQuery"
import { Suspense, useState } from "react"
import { MyStudentsTable } from "./components/MyStudentsTable"

export const MyClasses = () => {
    const { section_handled, grade_assigned } = teacherClassInfo()
    const [view, setView] = useState(false)
    const [section, setSection] = useState('')
    const [gradeLevel, setGradeLevel] = useState('')

    return (
        <div className="space-y-4">
            <div className="text-xl">
                My Classes
            </div>
            {!view &&
                <div className="space-y-4">
                    {section_handled.map((section, index) => (
                        <div 
                            key={index} 
                            className="border p-4 rounded-md cursor-pointer" 
                            onClick={() => {
                                setView(true)
                                setSection(section)
                                setGradeLevel(grade_assigned)
                            }}
                        >
                            {grade_assigned}<br/>{section}
                        </div>
                    ))}
                </div>
            }
            {view &&
                <div className="space-y-4">
                    <Button 
                        type={'button'} 
                        variant={'secondary'} 
                        onClick={() => setView(false)}
                    >
                        Go back
                    </Button>
                    <Suspense fallback={<div>Loading...</div>}>
                        <MyStudentsTable 
                            section={section} 
                            grade_level={gradeLevel}
                        />
                    </Suspense>
                </div>
            }
        </div>
    )
}