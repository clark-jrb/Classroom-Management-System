import { ColumnDef } from '@tanstack/react-table'
import { StudentData } from '@/types/student.types'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import { DeleteForm } from '../../components/DeleteForm'

export const columns: ColumnDef<StudentData>[] = [
    {
        accessorKey: "lastname",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Last Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "firstname",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    First Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "middlename",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Middle Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "sex",
        header: "Sex",
    },
    {
        accessorKey: "gradeLevel",
        header: "Grade Level",
    },
    {
        accessorKey: "section",
        header: "Section",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "contact",
        header: "Contact",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState(false)

            const student_id = row.original._id
            const role = row.original.role
            
            return (
                <>
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DialogTrigger asChild>
                                    <DropdownMenuItem>
                                        Delete Account
                                    </DropdownMenuItem>
                                </DialogTrigger>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DialogContent className="w-[20rem]">
                            <DialogHeader>
                                <DialogTitle>
                                    Are you sure?
                                </DialogTitle>
                                <DialogDescription className="py-4">
                                    This action cannot be undone. Are you sure you want to permanently delete this account?
                                </DialogDescription>
                                <div className="ms-auto">
                                    <div className="flex space-x-2">
                                        <DialogClose asChild>
                                            <Button 
                                                type="button" 
                                                variant={'destructive'}
                                            >
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <DeleteForm 
                                            sid={student_id} 
                                            setOpenDialog={setOpenDialog}
                                            role={role}
                                        />
                                    </div>
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </>
            )
        },
    },
]