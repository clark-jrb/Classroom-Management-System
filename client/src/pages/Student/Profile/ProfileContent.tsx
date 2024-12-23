import { Badge } from "@/components/ui/badge"
import { ReactComponent as PenEdit } from '@/assets/icons/pen-edit.svg'
import { useStudentDialogStore } from "@/stores/studentSlice"
import { studentFunctions } from "@/hooks/StudentQueries"
import {
    Dialog,
    DialogTrigger
} from "@/components/ui/dialog"
import { ProfileForm } from "./ProfileForm"
import moment from "moment"

export const ProfileContent = () => {
    const { studentData } = studentFunctions()
    const { open, openDialog } = useStudentDialogStore()

    // destructure studentData
    const { account, personal, classes } = studentData || {}
    const { email } = account || {}
    const { firstname, middlename, lastname, sex, contact, birth_date } = personal || {}
    const { gradeLevel, section } = classes || {}
    const fullName = `${firstname} ${middlename} ${lastname}`
    const grade = gradeLevel

    const studentDataOnUi = [
        { label: 'First Name', value: firstname },
        { label: 'Middle Name', value: middlename },
        { label: 'Last Name', value: lastname },
        { label: 'Email', value: email },
        { label: 'Sex', value: sex },
        { label: 'Grade & Section', value: `${gradeLevel}, ${section}` },
        { label: 'Contact', value: contact },
        { label: 'Birth Date', value: moment(birth_date).format('LL') },
    ]

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
