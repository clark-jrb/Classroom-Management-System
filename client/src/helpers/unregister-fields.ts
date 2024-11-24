
interface INextForm {
    form: any
    role: string
    nextForm: (item: boolean) => void
}

export function handleNextForm({ form, role, nextForm }: INextForm) {
    if (form.watch("email") && form.watch("password") && !form.formState.errors.password){
        nextForm(true)
    }
    if (role === 'student') {
        form.unregister('subjects')
        form.unregister('teacher_role')
        form.unregister('grade_assigned')
    }
    if (role === 'faculty') {
        form.unregister('gradeLevel')
        form.unregister('section')
    }
}