import { Badge } from "@/components/ui/badge"
import { ReactComponent as PenEdit } from '@/assets/icons/pen-edit.svg'
import { useStudentDialogStore } from "@/stores/studentSlice"
import { studentInfo } from "@/hooks/useStudentQueries"
import {
    Dialog,
    DialogTrigger
} from "@/components/ui/dialog"
import { ProfileForm } from "./ProfileForm"

export const ProfileContent = () => {
    const { fullName, grade, studentDataOnUi } = studentInfo()  // this should be complete or else it won't load the loading UI
    const { open, openDialog } = useStudentDialogStore()

    return (
        <>
            <Dialog open={open} onOpenChange={openDialog}>
                {/* PERSONAL INFO CONTENT  */}
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
                            {studentDataOnUi.map(({ label, value }, index: number) => (
                                <div key={index} className="info-data-cont" id={label}>
                                    <label htmlFor={label}>{label}:</label>
                                    <span className="text-lg">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* DIALOG CONTENT */}
                <ProfileForm/>
            </Dialog>
        </>
    )
}
