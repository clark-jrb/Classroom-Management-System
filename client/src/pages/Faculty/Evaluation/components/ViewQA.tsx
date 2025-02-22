import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { QATable } from "./QATable"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QuarterTypes } from "@/types/GlobalTypes"

export const ViewQA = ({ grade_assigned, section }: {
    grade_assigned: string
    section: string 
}) => {
    const navigate = useNavigate()
    const [quarter, setQuarter] = useState('q1')

    return (
        <div>
            <div className="flex">
                <div>
                    <Button variant={'outline'} onClick={() => navigate('/evaluation')}>Go back</Button>
                </div>
                <div className="ms-auto">
                    <Select onValueChange={setQuarter} defaultValue={quarter}>
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
            
            <QATable 
                section={section} 
                grade_assigned={grade_assigned} 
                quarter={quarter as QuarterTypes}
            />
            
        </div>
    )
}
