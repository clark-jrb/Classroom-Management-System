import { Roles } from "@/types/global.types"


export function unregisterFields({ form, role }: {
    form: any
    role: Roles
}) {
    /** Unregister fields if role is student */
    if (role === 'student') {
        form.unregister('subjects')
        form.unregister('teacher_role')
        form.unregister('grade_assigned')
        form.unregister('section_handled')
    }
    /** Unregister fields if role is faculty */
    if (role === 'faculty') {
        form.unregister('gradeLevel')
        form.unregister('section')
    }
}