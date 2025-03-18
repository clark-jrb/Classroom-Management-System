import { StudentQA } from "@/types/computation.types"
import { ColumnDef } from "@tanstack/react-table"
import { ColoredRow } from "./colored-row"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<StudentQA>[] = [
  {
    accessorKey: "sid.lastname",
    header: "Last Name",
  },
  {
    accessorKey: "sid.firstname",
    header: "First Name",
  },
  {
    accessorKey: "math",
    header: "Math",
    cell: ({ row }) => {
        return (
            <ColoredRow grade={row.original.math}/>
        )
    }
  },
  {
    accessorKey: "science",
    header: "Science",
    cell: ({ row }) => {
        return (
            <ColoredRow grade={row.original.science}/>
        )
    }
  },
  {
    accessorKey: "english",
    header: "English",
    cell: ({ row }) => {
        return (
            <ColoredRow grade={row.original.english} />
        )
    }
  },
  {
    accessorKey: "hekasi",
    header: "Hekasi",
    cell: ({ row }) => {
        return (
            <ColoredRow grade={row.original.hekasi}/>
        )
    }
  },
  {
    accessorKey: "filipino",
    header: "Filipino",
    cell: ({ row }) => {
        return (
            <ColoredRow grade={row.original.filipino}/>
        )
    }
  },
  {
    accessorKey: "mapeh",
    header: "MAPEH",
    cell: ({ row }) => {
        return (
            <ColoredRow grade={row.original.mapeh}/>
        )
    }
  },
]
