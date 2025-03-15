import { TTask, TUpdateTask } from "@/types/task.types"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Pen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { TaskDelete } from "../TaskDelete"
import { TaskUpdate } from "../TaskUpdate"

export const columns: ColumnDef<TTask>[] = [
  {
    accessorKey: "task_no",
    header: "No.",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "total_items",
    header: "Total items",
  },
  {
    accessorKey: "grade",
    header: "Grade level",
  },
  {
    accessorKey: "section",
    header: "Section",
  },
  {
    accessorKey: "quarter",
    header: "Quarter",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [openDelete, setOpenDelete] = useState(false)
      const [openUpdate, setOpenUpdate] = useState(false)
      const [taskId, setTaskId] = useState<string | null>(null);
      const [updateData, setUpdateData] = useState<{ 
        subject: string, 
        total_items: number, 
        task_no: number 
      }>({ subject: '', total_items: 0, task_no: 0 });

      
      const handleDeleteDialog = (id: string) => {
        setTaskId(id)
        setOpenDelete(true)
      }

      const handleUpdateDialog = (id: string, data: TUpdateTask) => {
        setTaskId(id)
        setUpdateData(data)
        setOpenUpdate(true)
      }

      return (
        <>
          
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem 
                onSelect={(e) => {
                  e.stopPropagation()
                  handleUpdateDialog(
                    row.original._id, 
                    {
                      subject: row.original.subject,
                      total_items: row.original.total_items,
                      task_no: row.original.task_no
                    }
                  )
                }}
                className="text-base"
              >
                Edit <Pen strokeWidth={1} className="ms-auto"/>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onSelect={(e) => {
                  e.stopPropagation()
                  handleDeleteDialog(row.original._id)
                }}
                className="text-base text-red-500 hover:text-red-500"
              >
                Delete <Trash2 strokeWidth={1} className="ms-auto"/>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {taskId && 
            <>
              <TaskDelete
                task_id={taskId}
                openDialog={openDelete}
                setOpenDialog={setOpenDelete}
              />
              <TaskUpdate
                task_id={taskId}
                task_data={updateData}
                openDialog={openUpdate}
                setOpenDialog={setOpenUpdate}
              />
            </>
          }
        </>
      )
    },
  },
]
