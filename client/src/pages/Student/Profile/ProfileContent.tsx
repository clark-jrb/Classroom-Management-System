import { Badge } from "@/components/ui/badge"
import { useStudentDialogStore } from "@/stores/studentSlice"
import {
    Dialog,
    DialogTrigger
} from "@/components/ui/dialog"
import { ProfileForm } from "./ProfileForm"
import moment from "moment"
import { useAuthStore } from "@/stores/auth/authSlice"
import { StudentInformation } from "@/types/student.types"
import { TeacherInformation } from "@/types/teacher.types"
import { Button } from "@/components/ui/button"
import { CircleUserRound, Pencil } from "lucide-react"
import { getGradeName } from "@/helpers/get-quarter"
import { toCamelCase } from "@/helpers/camel-case"

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

    const basicInfo = [
        { label: 'First Name', value: firstname },
        { label: 'Middle Name', value: middlename },
        { label: 'Last Name', value: lastname },
        { label: 'Birth Date', value: moment(birth_date).format('LL') },
        { label: 'Sex', value: sex },
        { label: 'Email', value: email },
        { label: 'Contact', value: contact },
    ]

    const studentProfile = [
        ...basicInfo,
        { label: 'Grade & Section', value: `${getGradeName(gradeLevel)}, ${section}` },
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
                <div className="flex-1 flex flex-col gap-6">
                    {/* HEADER */}
                    <div className="flex gap-3 border p-6 w-full rounded-md items-center">
                        <div className="text-gray-500">
                            <CircleUserRound strokeWidth={.5} size={'4rem'} />
                        </div>
                        <div className="space-y-2">
                            <div className="text-2xl text-navy font-semibold">
                                {full_name}
                            </div>
                            {role === 'student' && 
                                <div className="flex gap-2">
                                    <Badge variant="navy">{getGradeName(gradeLevel)}</Badge>
                                    <Badge variant="secondary">{toCamelCase(section)}</Badge>
                                </div>
                            }
                        </div>
                    </div>
                    {/* BODY */}
                    <div className="flex-1 border p-6 w-full rounded-md space-y-6">
                        {/* BODY HEADER */}
                        <div className="flex items-start">
                            <div className="font-semibold text-xl text-navy">
                                Profile Information
                            </div>
                            <div className="ms-auto">
                                <DialogTrigger asChild>
                                    <Button
                                        type="button"
                                        variant={'outline'}
                                    >
                                        Edit<Pencil strokeWidth={1} />
                                    </Button>
                                </DialogTrigger>
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-3 grid-rows-2 gap-6">
                            {role === 'student' && studentProfile.map(({ label, value }, index) => (
                                <div key={index} className="w-fit space-y-2" id={label}>
                                    <div className="text-gray-500 text-sm">{label}</div>
                                    <div className="text-lg">{value}</div>
                                </div>
                            ))}

                            {role === 'faculty' && teacherProfile.map(({ label, value }, index) => (
                                <div key={index} className="w-fit space-y-2" id={label}>
                                    <div className="text-gray-500 text-sm">{label}</div>
                                    <div className="text-lg">{value}</div>
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
