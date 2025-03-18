import { StudentCalculatedQA, StudentGA } from "@/types/computation.types"
import { ColumnDef } from "@tanstack/react-table"
import { ColoredRow } from "../QA/colored-row"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns = (
  students_ga: StudentGA['student_ga']
): ColumnDef<StudentCalculatedQA>[] => [
  {
    accessorKey: "lastname",
    header: "Last Name",
  },
  {
    accessorKey: "firstname",
    header: "First Name",
  },
  {
    accessorKey: "total_qa.math",
    header: "Math",
    cell: ({ row }) => {
      const math_grade = row.original.total_qa.math
      return (
        <div>
          {math_grade ? math_grade.toFixed(0) : ''}
        </div>
      )
    }
  },
  {
    accessorKey: "total_qa.science",
    header: "Science",
    cell: ({ row }) => {
      const science_grade = row.original.total_qa.science
      return (
        <div>
          {science_grade ? science_grade.toFixed(0) : ''}
        </div>
      )
    }
  },
  {
    accessorKey: "total_qa.english",
    header: "English",
    cell: ({ row }) => {
      const english_grade = row.original.total_qa.english
      
      return (
        <div>
          {english_grade ? english_grade.toFixed(0) : ''}
        </div>
      )
    }
  },
  {
    accessorKey: "total_qa.filipino",
    header: "Filipino",
    cell: ({ row }) => {
      const filipino_grade = row.original.total_qa.filipino

      return (
        <div>
          {filipino_grade ? filipino_grade.toFixed(0) : ''}
        </div>
      )
    }
  },
  {
    accessorKey: "total_qa.hekasi",
    header: "Hekasi",
    cell: ({ row }) => {
      const hekasi_grade = row.original.total_qa.hekasi

      return (
        <div>
          {hekasi_grade ? hekasi_grade.toFixed(0) : ''}
        </div>
      )
    }
  },
  {
    accessorKey: "total_qa.mapeh",
    header: "MAPEH",
    cell: ({ row }) => {
      const mapeh_grade = row.original.total_qa.mapeh

      return (
        <div>
          {mapeh_grade ? mapeh_grade.toFixed(0) : ''}
        </div>
      )
    }
  },
  {
    header: "General Average",
    cell: ({ row }) => {
      const student_id = row.original.sid
      const get_ga = students_ga.find(data => data.sid === student_id)?.general_ave

      if (!get_ga) {
        return <div></div>
      }

      return (
        <ColoredRow grade={get_ga}/>
      )
    }
  },
]
