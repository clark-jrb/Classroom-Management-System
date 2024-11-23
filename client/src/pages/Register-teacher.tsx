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
        { name: 'Math' },
        { name: 'English' },
        { name: 'Hekasi' },
        { name: 'Science' },
    ]

    const selectedSubjects = form.watch("subjects");

    const handleCheckboxChange = (value: string, checked: boolean): void => {
        const currentSubjects = selectedSubjects || [];
        if (checked) {
            // Add value if checked
            form.setValue("subjects", [...currentSubjects, value]);
        } else {
            // Remove value if unchecked
            form.setValue(
                "subjects",
                currentSubjects.filter((item: string) => item !== value)
            );
        }
    };
    
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
                                        handleCheckboxChange(name, checked as boolean)}
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
