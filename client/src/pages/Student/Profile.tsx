import { StudentContainer } from "@/components/student-container"
import { StudentLayout } from "./StudentLayout"
import { studentInfo } from "@/hooks/useStudentInfo"
import { Badge } from "@/components/ui/badge"
import { ReactComponent as PenEdit } from '@/assets/icons/pen-edit.svg'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Button } from "@/components/ui/button"

export const Profile = () => {
    const { fullName, grade, studentData, isLoading, isError } = studentInfo()  // this should be complete or else it won't load the loading UI

    return (
        <StudentLayout>
            <StudentContainer>
                <Dialog>
                    {/* PROFILE CONTENT  */}
                    <div className="h-full">
                        {isError && <div>Error</div>}
                        {isLoading ? 
                            <div>Loading...</div> 
                            : 
                            <div className="info-cont">
                                {/* HEADER */}
                                <div className="info-cont-head h-auto w-full">
                                    <div className="w-96">
                                        <div className="student-name mb-2">
                                            <p>
                                                {fullName}
                                            </p>
                                        </div>
                                        <div className="flex mb-4">
                                            <Badge variant="outline">Grade&nbsp;{grade}</Badge>
                                            <DialogTrigger asChild>
                                                <span className="edit-profi-btn flex ms-auto text-sm">
                                                    Edit&nbsp;<PenEdit className="h-5"/>
                                                </span>
                                            </DialogTrigger>
                                            
                                        </div>
                                    </div>
                                </div>
                                {/* BODY */}
                                <div className="info-cont-body pt-8 h-full w-full">
                                    <div className="w-96 flex flex-col gap-5">
                                        {studentData.map(({ label, value }, index: number) => (
                                            <div key={index} className="info-data-cont" id={label}>
                                                <label htmlFor={label}>{label}:</label>
                                                <span className="text-lg">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                </div>
                                
                            </div>
                        }
                    </div>
                    {/* DIALOG CONTENT  */}
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                    Name
                                    </Label>
                                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                    Username
                                    </Label>
                                    <Input id="username" value="@peduarte" className="col-span-3" />
                                </div>
                            </div>
                        <DialogFooter>
                        <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </StudentContainer>
        </StudentLayout>
    )
}
