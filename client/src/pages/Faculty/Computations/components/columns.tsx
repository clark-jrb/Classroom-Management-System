import { StudentPerformance } from "@/types/computation.types"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<StudentPerformance['student_performance'][number]>[] = [
    {
        accessorKey: "lastname",
        header: "Last Name",
    },
    {
        accessorKey: "firstname",
        header: "First Name",
    },
    {
        accessorKey: "recitation",
        header: "Recitation",
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.recitation 
                        ? row.original.recitation.toFixed(2) 
                        : ''
                    }
                </div>
            )
        }
    },
    {
        accessorKey: "activity",
        header: "Activity",
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.activity 
                        ? row.original.activity.toFixed(2) 
                        : ''
                    }
                </div>
            )
        }
    },
    {
        accessorKey: "quiz",
        header: "Quiz",
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.quiz 
                        ? row.original.quiz.toFixed(2) 
                        : ''
                    }
                </div>
            )
        }
    },
    {
        accessorKey: "project",
        header: "Project",
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.project 
                        ? row.original.project.toFixed(2) 
                        : ''
                    }
                </div>
            )
        }
    },
    {
        accessorKey: "summative",
        header: "Summative",
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.summative 
                        ? row.original.summative.toFixed(2)
                        : ''
                    }
                </div>
            )
        }
    },
    {
        accessorKey: "exam",
        header: "Exam",
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.exam 
                        ? row.original.exam.toFixed(2) 
                        : ''
                    }
                </div>
            )
        }
    },
    {
        header: "Subject Grade",
        cell: ({ row }) => {
            return (
                <div>
                    {(
                        row.original.recitation + 
                        row.original.activity +
                        row.original.quiz +
                        row.original.project +
                        row.original.summative +
                        row.original.exam
                    ).toFixed(1) || 0}
                </div>
            )
        }
    },
]
