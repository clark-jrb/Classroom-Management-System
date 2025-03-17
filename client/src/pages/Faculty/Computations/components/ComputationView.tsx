import { useParams, useNavigate } from "react-router-dom"
import { Procedures } from "./Procedures"
import { QuarterTypes, SubjectTypes } from "@/types/global.types"
import { teacherClassInfo } from "@/hooks/useTeacherQuery"
import { Suspense, useState } from "react"
import { ComputationViewTable } from "./ComputationViewTable"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { toCamelCase } from "@/helpers/camel-case"
import { getGradeName } from "@/helpers/get-quarter"

export const ComputationView = () => {
    const { section, subject } = useParams<{ section: string, subject: SubjectTypes }>()
    const { section_handled, subjects, grade_assigned } = teacherClassInfo()
    const navigate = useNavigate()
    // const { quarter, setQuarter } = useQuarterStore()
    const [weight, setWeight] = useState(0)
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
        <div className="space-y-4">
            <div className="flex gap-5 items-center">
                <Button variant={'ghost'} onClick={() => navigate('/computations')}>
                    <ArrowLeft/>
                </Button>
                <div className="flex items-end gap-2">
                    <div className="text-2xl text-navy">
                        {toCamelCase(subject)}
                    </div>
                    <div className="text-gray-500 text-2xl">/</div>
                    <div className="text-gray-500">
                        {getGradeName(grade_assigned)}, {toCamelCase(section)}
                    </div>
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
            <div className="flex h-full gap-5">
                <Procedures 
                    subject_handled={subject} 
                    section_assigned={section} 
                    grade_assigned={grade_assigned}
                    weight={weight}
                    setWeight={setWeight}
                    quarter={quarter}
                />
                <Suspense fallback={<div>loading...</div>}>
                    <ComputationViewTable 
                        section={section}
                        subject={subject}
                        weight={weight}
                        quarter={quarter}
                    />
                </Suspense>
            </div>
        </div>
    )
}
