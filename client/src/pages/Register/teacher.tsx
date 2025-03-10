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
import { Label } from "@/components/ui/label"
import { grade_sections, grade_levels, subjects_names } from "@/constants/options"

interface IRegisterTeacher {
    form: any
}

export const RegisterTeacher = ({ form }: IRegisterTeacher) => {
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
    const filteredSections = grade_sections.filter((item) => item.grade === selectedGradeLevel).flatMap((item) => item.sections)

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
            <div className="flex gap-6">
                <div className="w-[25rem] space-y-6">
                    <FormField
                        control={form.control}
                        name="teacher_role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Teaching Role:</FormLabel>
                                    <Select 
                                        // onValueChange={field.onChange} 
                                        onValueChange={(value) => {
                                            field.onChange(value)
                                            form.resetField("section_handled")
                                            form.resetField("subjects")
                                        }} 
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="py-6">
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
                                    <Select 
                                        onValueChange={(value) => {
                                            field.onChange(value)
                                            form.resetField("section_handled")
                                        }} 
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="py-6">
                                                <SelectValue placeholder="select grade level" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {grade_levels.map(({ name, value }, index) => (
                                                <SelectItem key={index} value={value}>{name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {/* show the checkbox when there is selected grade level */}
                {(selectedGradeLevel || selectedTeacherRole) && 
                    <div className="w-[25rem] space-y-6">
                        {selectedTeacherRole &&
                            <div className="space-y-2">
                                <Label>Select subject(s):</Label>
                                <div className="inline-grid grid-cols-3 gap-4">
                                    {subjects_names.map(({ name }, index) => (
                                        <FormField
                                            key={index}
                                            control={form.control}
                                            name={'subjects'}
                                            render={() => (
                                                <FormItem>
                                                    <FormLabel className="font-normal">
                                                        <div className="p-4 shadow-sm rounded-md flex gap-2 items-center border">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={form.watch('subjects')?.includes(name)}
                                                                    onCheckedChange={(checked) =>
                                                                        handleSubjectsChange(name, checked as boolean)
                                                                    }
                                                                    // disabled={
                                                                        //     !selectedSubjects.includes(name) && selectedSubjects.length >= maxSubject
                                                                        // }
                                                                />
                                                            </FormControl>
                                                            {toCamelCase(name)}
                                                        </div>
                                                    </FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    ))} 
                                </div>
                                {form.formState.errors.subjects && (
                                    <p className="text-red-600">
                                        {form.formState.errors.subjects.message}
                                    </p>
                                )}
                            </div>
                        }
                        {selectedGradeLevel &&
                            <div className="space-y-2">
                                <Label>Select section(s):</Label>
                                <div className="flex gap-4">
                                    {filteredSections.map((data, index) => (
                                        <FormField
                                            key={index}
                                            control={form.control}
                                            name={'section_handled'}
                                            render={() => (
                                                <FormItem>
                                                    <FormLabel className="w-fit block font-normal">
                                                        <div className="p-4 shadow-sm rounded-md flex gap-2 items-center border">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={form.watch('section_handled')?.includes(data)}
                                                                    onCheckedChange={(checked) => handleSectionHandledChange(data, checked as boolean)}
                                                                    />
                                                            </FormControl>
                                                            {toCamelCase(data)}
                                                        </div>
                                                    </FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    ))} 
                                </div>
                                {form.formState.errors.section_handled && (
                                    <p className="text-red-600">
                                        {form.formState.errors.section_handled.message}
                                    </p>
                                )}
                            </div> 
                        }
                    </div>
                }
            </div>
        </div>
    )
}
