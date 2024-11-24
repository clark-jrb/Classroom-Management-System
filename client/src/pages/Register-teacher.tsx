import { 
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toCamelCase } from "@/helpers/camel-case"

interface IRegisterTeacher {
    form: any
}

export const RegisterTeacher = ({ form }: IRegisterTeacher) => {
    const subjects = [
        { name: 'math' },
        { name: 'english' },
        { name: 'hekasi' },
        { name: 'filipino' },
        { name: 'mapeh' },
        { name: 'science' },
    ]

    const student_classes = [
        { name: 'Grade 1', value: 'grade_1'},
        { name: 'Grade 2', value: 'grade_2'},
        { name: 'Grade 3', value: 'grade_3'},
        { name: 'Grade 4', value: 'grade_4'},
        { name: 'Grade 5', value: 'grade_5'},
        { name: 'Grade 6', value: 'grade_6'},
    ]

    const sectionsList = [
        { grade: 'grade_1', sections: ['Crabs', 'Corals'] },
        { grade: 'grade_2', sections: ['Pearls', 'Shrimps'] },
        { grade: 'grade_3', sections: ['Squids', 'Octopus'] },
        { grade: 'grade_4', sections: ['Lobsters', 'Eels'] },
        { grade: 'grade_5', sections: ['Turtles', 'Dolphins'] },
        { grade: 'grade_6', sections: ['Whales', 'Sharks'] }
    ];

    // watch subjects changes
    const selectedSubjects = form.watch("subjects");
    // watch grade assigned changes
    const grade_level = form.watch("grade_assigned") 

    // filter section list according to grade level
    const filteredSections = sectionsList.filter((item) => item.grade === grade_level).flatMap((item) => item.sections)

    // handling checkboxes to add its values in the subjects array
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
            <div>
                <FormField
                        control={form.control}
                        name="teacher_role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Teaching Role:</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="homeroom">homeroom</SelectItem>
                                            <SelectItem value="subject">subject</SelectItem>
                                        </SelectContent>
                                    </Select>
                                <FormMessage />
                            </FormItem>
                    )}
                />
                <FormField
                        control={form.control}
                        name="grade_assigned"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Class Assigned:</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select grade level" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {student_classes.map(({ name, value }, index) => (
                                                <SelectItem key={index} value={value}>{name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                <FormMessage />
                            </FormItem>
                    )}
                />
                {form.watch("teacher_role") === "homeroom" && (
                    <FormField
                        control={form.control}
                        name="section_handled"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Class Section:</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select class section" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="homeroom">homeroom</SelectItem>
                                            <SelectItem value="subject">subject</SelectItem>
                                        </SelectContent>
                                    </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
            </div>
            <div>
                {subjects.map(({ name }, index) => (
                    <FormField
                        key={index}
                        control={form.control}
                        name={'subjects'}
                        render={() => (
                            <FormItem>
                                <FormLabel>{toCamelCase(name)}</FormLabel>
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
        </div>
    )
}
