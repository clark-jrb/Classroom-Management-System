
interface INextForm {
    form: any
    role: string
}

export function unregisterFields({ form, role }: INextForm) {
    if (role === 'student') {
        form.unregister('subjects')
        form.unregister('teacher_role')
        form.unregister('grade_assigned')
        form.unregister('section_handled')
    }
    if (role === 'faculty') {
        form.unregister('gradeLevel')
        form.unregister('section')
    }
}