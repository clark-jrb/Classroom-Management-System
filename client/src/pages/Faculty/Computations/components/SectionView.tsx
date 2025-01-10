import { useParams, useNavigate } from "react-router-dom"
import { Procedures } from "./Procedures"
import { SubjectTypes } from "@/types/types"
import { teacherInfo } from "@/hooks/useTeacherQueries"
import { Suspense } from "react"
import { SectionViewTable } from "./SectionViewTable"
import { Button } from "@/components/ui/button"

export const SectionView = () => {
    const { section, subject } = useParams<{ section: string, subject: SubjectTypes }>()
    const { section_handled, subjects, grade_assigned } = teacherInfo()
    const navigate = useNavigate()

    // validation of required route parameters
    if (!section || !subject) {
        return <div>Error: Missing required route parameters</div>
    }

    // url PARAMETER validations
    if (!subjects.includes(subject as SubjectTypes) || !section_handled.includes(section)) {
        return <div>Error: Invalid subject or section parameter</div>
    }

    return (
        <div>
            <div className="flex gap-5 mb-5">
                <Button variant={'outline'} onClick={() => navigate('/computations')}>Go back</Button>
                <div>Subject: {subject}</div>
                <div>Grade and Section: {grade_assigned}, {section}</div>
            </div>
            <div className="flex h-full gap-5">
                <Procedures subject_handled={subject} section_assigned={section}/>
                <Suspense fallback={<div>loading...</div>}>
                    <SectionViewTable grade_assigned={grade_assigned} section={section} subject={subject}/>
                </Suspense>
            </div>
        </div>
    )
}
