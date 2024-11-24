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
        { grade: 'grade_1', sections: ['crabs', 'corals'] },
        { grade: 'grade_2', sections: ['pearls', 'shrimps'] },
        { grade: 'grade_3', sections: ['squids', 'octopus'] },
        { grade: 'grade_4', sections: ['lobsters', 'eels'] },
        { grade: 'grade_5', sections: ['turtles', 'dolphins'] },
        { grade: 'grade_6', sections: ['whales', 'sharks'] }
    ]

    // watch subjects changes
    const selectedSubjects = form.watch("subjects")
    // watch subjects changes
    const selectedSections = form.watch("section_handled")
    // watch grade assigned changes
    const selectedGradeLevel = form.watch("grade_assigned") 
    // watch teacher role
    const selectedTeacherRole = form.watch("teacher_role")

    const maxSubject = selectedTeacherRole === "homeroom" ? 3 : 1

    // filter section list according to grade level
    const filteredSections = sectionsList.filter((item) => item.grade === selectedGradeLevel).flatMap((item) => item.sections)

    // handling checkboxes to add its values in the subjects array
    const handleSubjectsChange = (value: string, checked: boolean): void => {
        const currentSubjects = selectedSubjects || []
        
        if (selectedTeacherRole === "homeroom") {
            if (checked) {
                // Add value if checked and the current array has less than the max allowed elements
                if (currentSubjects.length < maxSubject) {
                    form.setValue("subjects", [...currentSubjects, value]);
                } else {
                    // Optionally, handle the case where the max is reached
                    console.log("Maximum number of subjects reached!");
                }
            } else {
                // Remove value if unchecked
                form.setValue(
                    "subjects",
                    currentSubjects.filter((item: string) => item !== value)
                );
            }
        }
        if (selectedTeacherRole === "subject") {
            checked ? 
                form.setValue("subjects", [value]) // (only one, it will replace if there is already one)
                :
                form.setValue("subjects", [])
        }
    }

    // handling checkboxes to add its values in the subjects array
    const handleSectionHandledChange = (value: string, checked: boolean): void => {
        const currentSections = selectedSections || []
        if (selectedTeacherRole === "homeroom") {
            checked ? 
                form.setValue("section_handled", [value]) // (only one, it will replace if there is already one)
                :
                form.setValue("section_handled", [])
        }
        
        if (selectedTeacherRole === "subject") {
            checked ?
                form.setValue("section_handled", [...currentSections, value]) // Add value if checked
                :
                form.setValue(
                    "section_handled",
                    currentSections.filter((item: string) => item !== value)
                ) // Remove value if unchecked
        }
    }
    
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
                                            <SelectValue placeholder="Select role" />
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
                {/* show the checkbox when there is selected grade level */}
                {selectedGradeLevel &&
                    <div>
                        {filteredSections.map((data, index) => (
                            <FormField
                                key={index}
                                control={form.control}
                                name={'section_handled'}
                                render={() => (
                                    <FormItem>
                                        <FormLabel>{toCamelCase(data)}</FormLabel>
                                        <FormControl>
                                            <Checkbox
                                                checked={form.watch('section_handled')?.includes(data)}
                                                onCheckedChange={(checked) => handleSectionHandledChange(data, checked as boolean)}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        ))} 
                        {form.formState.errors.section_handled && (
                            <p className="text-red-600">
                                {form.formState.errors.section_handled.message}
                            </p>
                        )}
                    </div> 
                }
                {selectedTeacherRole &&
                    <div className="py-6">
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
                                                checked={form.watch('subjects')?.includes(name)}
                                                onCheckedChange={(checked) =>
                                                    handleSubjectsChange(name, checked as boolean)}
                                                // disabled={
                                                //     !selectedSubjects.includes(name) && selectedSubjects.length >= maxSubject
                                                // }
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
                }
            </div>
        </div>
    )
}
