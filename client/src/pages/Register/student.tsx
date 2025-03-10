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
import { grade_levels, grade_sections } from "@/constants/options"

interface IRegisterStudent {
    form: any
}

export const RegisterStudent = ({ form }: IRegisterStudent) => {
    // watch grade level changes
    const grade_level = form.watch("gradeLevel") 

    // filter section list according to grade level
    const filteredSections = grade_sections.filter((item) => item.grade === grade_level).flatMap((item) => item.sections)

    return (
        <>
        {/* Grade Level */}
        <FormField
            control={form.control}
            name="gradeLevel"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Grade Level:</FormLabel>
                        <Select 
                            onValueChange={(value) => {
                                field.onChange(value)
                                form.resetField("section") // reset section field whenever this grade level changes its value (UI issues) 
                            }} 
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger className="py-6">
                                    <SelectValue placeholder="Select your grade level" />
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
        {/* Section */}
        {grade_level && 
            <FormField
                key={grade_level}
                control={form.control}
                name="section"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Section:</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="py-6">
                                        <SelectValue placeholder="your section" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {filteredSections.map((section, index) => (
                                        <SelectItem value={section} key={index}>{section}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        }
        </>
    )
}