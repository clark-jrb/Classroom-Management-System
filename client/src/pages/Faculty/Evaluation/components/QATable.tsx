import { useStudentsQA } from "@/hooks/useTaskQuery"
import { QuarterTypes } from "@/types/global.types"
import { DataTable } from "./QA/data-table"
import { columns } from "./QA/columns"

export const QATable = ({ section, grade_assigned, quarter }: {
    section: string
    grade_assigned: string
    quarter: QuarterTypes
}) => {
    const { data: students_qa } = useStudentsQA(grade_assigned, section)

    const filtered_qa = students_qa.filter(data => data.quarter === quarter)

    return (
        <div>
            <DataTable columns={columns} data={filtered_qa}/>
        </div>
    )
}
