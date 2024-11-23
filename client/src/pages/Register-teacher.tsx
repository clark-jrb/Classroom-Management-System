import { 
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    // FormMessage
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

interface IRegisterTeacher {
    form: any
    handleCheckbox: (value: string, checked: boolean) => void
}

export const RegisterTeacher = ({ form, handleCheckbox }: IRegisterTeacher) => {
    const subjects = [
        { name: 'Math' },
        { name: 'English' },
        { name: 'Hekasi' },
        { name: 'Science' },
    ]

    return (
        <div>
            {subjects.map(({ name }, index) => (
                <FormField
                    key={index}
                    control={form.control}
                    name={'subjects'}
                    render={() => (
                        <FormItem>
                            <FormLabel>{name}</FormLabel>
                            <FormControl>
                                <Checkbox
                                    // checked={field.value}
                                    onCheckedChange={(checked) =>
                                        handleCheckbox(name, checked as boolean)}
                                    // disabled={registerUser.isPending}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            ))} 
            {form.formState.errors.subjects && (
                <p className="text-red-600">
                    {form.formState.errors.subjects.message}
                </p>
            )}
        </div>
    )
}
