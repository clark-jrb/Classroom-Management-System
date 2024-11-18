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
}

export const RegisterTeacher = ({ form }: IRegisterTeacher) => {
    const subjects = [
        { name: 'Math', checked: false },
        { name: 'English', checked: false },
        { name: 'Hekasi', checked: false },
        { name: 'Science', checked: false },
    ]

    return (
        <div>
            {subjects.map(({ name }, index) => (
                <FormField
                    key={index}
                    control={form.control}
                    name={`subjects.${index}.checked`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{name}</FormLabel>
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    // disabled={registerUser.isPending}
                                />
                            </FormControl>
                            <input
                                type="hidden"
                                value={name}
                                {...form.register(`subjects.${index}.name`)}
                            />
                        </FormItem>
                    )}
                />
            ))}
            {form.formState.errors.subjects && (
                <p className="text-red-600">
                    {form.formState.errors.subjects?.root?.message}
                </p>
            )}
        </div>
    )
}
