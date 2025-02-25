import { Badge } from "@/components/ui/badge"
import { ReactComponent as PenEdit } from '@/assets/icons/pen-edit.svg'
import { useStudentDialogStore } from "@/stores/studentSlice"
import {
    Dialog,
    DialogTrigger
} from "@/components/ui/dialog"
import { ProfileForm } from "./ProfileForm"
import moment from "moment"
import { useAuthStore } from "@/stores/auth/authSlice"
import { StudentInformation } from "@/types/StudentTypes"
import { TeacherInformation } from "@/types/TeacherTypes"

export const ProfileContent = ({ user_data }: {
    user_data: StudentInformation | TeacherInformation
}) => {
    const { role } = useAuthStore()
    const { open, openDialog } = useStudentDialogStore()

    // destructure student_data
    const { account, profile, classes } = user_data
    const { email } = account
    const { firstname, middlename, lastname, sex, contact, birth_date } = profile
    const { gradeLevel, section } = classes as StudentInformation['classes']
    const { section_handled, teacher_role, grade_assigned, subjects } = classes as TeacherInformation['classes']

    const full_name = `${firstname} ${middlename} ${lastname}`
    const grade = gradeLevel

    const basicInfo = [
        { label: 'First Name', value: firstname },
        { label: 'Middle Name', value: middlename },
        { label: 'Last Name', value: lastname },
        { label: 'Email', value: email },
        { label: 'Sex', value: sex },
        { label: 'Contact', value: contact },
        { label: 'Birth Date', value: moment(birth_date).format('LL') },
    ]

    const studentProfile = [
        ...basicInfo,
        { label: 'Grade & Section', value: `${gradeLevel}, ${section}` },
    ]

    const teacherProfile = [
        ...basicInfo,
        { label: 'Role', value: `${teacher_role}` },
        { label: 'Grade Assigned', value: `${grade_assigned}` },
        { label: 'Section Handled', value: `${section_handled?.join(', ')}` },
        { label: 'Subjects', value: `${subjects?.join(', ')}` },
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
                                    {full_name}
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
                            {role === 'student' && studentProfile.map(({ label, value }, index) => (
                                <div key={index} className="info-data-cont" id={label}>
                                    <label htmlFor={label}>{label}:</label>
                                    <span className="text-lg">{value}</span>
                                </div>
                            ))}

                            {role === 'faculty' && teacherProfile.map(({ label, value }, index) => (
                                <div key={index} className="info-data-cont" id={label}>
                                    <label htmlFor={label}>{label}:</label>
                                    <span className="text-lg">{value}</span>
                                </div>
                            ))}

                            {!role && <div>You are not authenticated</div>}
                        </div>
                    </div>
                </div>
                {/* DIALOG CONTENT */}
                <ProfileForm user_data={user_data}/>
            </Dialog>
        </>
    )
}
