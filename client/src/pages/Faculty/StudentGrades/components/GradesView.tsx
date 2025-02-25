import { useParams, useNavigate } from "react-router-dom"
import { QuarterTypes, SubjectTypes } from "@/types/GlobalTypes"
import { teacherClassInfo } from "@/hooks/useTeacherQueries"
import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GradesViewTable } from "./GradesViewTable"
import { Label } from "@/components/ui/label"
import { toCamelCase } from "@/helpers/camel-case"

export const GradesView = () => {
    const { section, subject } = useParams<{ section: string, subject: SubjectTypes }>()
    const { section_handled, subjects, grade_assigned } = teacherClassInfo()
    const navigate = useNavigate()
    // const { quarter, setQuarter } = useQuarterStore()
    const [quarter, setQuarter] = useState<QuarterTypes>('q1')

    // validation of required route parameters
    if (!section || !subject) {
        return <div>Error: Missing required route parameters</div>
    }

    // url PARAMETER validations
    if (!subjects.includes(subject as SubjectTypes) || !section_handled.includes(section)) {
        return <div>Error: Invalid subject or section parameter</div>
    }

    const handleQuarterChange = (value: string) => {
        setQuarter(value as QuarterTypes)
    }

    return (
        <div>
            <div className="flex gap-5 mb-5">
                <Button variant={'outline'} onClick={() => navigate('/grades')}>Go back</Button>
                <div>
                    <Label>Subject:</Label> &nbsp;
                    {toCamelCase(subject)}
                </div>
                <div>
                    <Label>Grade and Section:</Label> &nbsp;
                    {toCamelCase(grade_assigned)}, {toCamelCase(section)}
                </div>
                <div className="ms-auto">
                    <Select onValueChange={handleQuarterChange} defaultValue={quarter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Quarter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="q1">Quarter 1</SelectItem>
                            <SelectItem value="q2">Quarter 2</SelectItem>
                            <SelectItem value="q3">Quarter 3</SelectItem>
                            <SelectItem value="q4">Quarter 4</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="h-full gap-5">
                <Suspense fallback={<div>loading...</div>}>
                    <GradesViewTable section={section} subject={subject} quarter={quarter}/>
                </Suspense>
            </div>
        </div>
    )
}
