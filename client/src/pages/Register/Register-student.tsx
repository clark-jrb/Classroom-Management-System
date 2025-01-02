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

interface IRegisterStudent {
    form: any
}

export const RegisterStudent = ({ form }: IRegisterStudent) => {
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
    ];
    
    // watch grade level changes
    const grade_level = form.watch("gradeLevel") 

    // filter section list according to grade level
    const filteredSections = sectionsList.filter((item) => item.grade === grade_level).flatMap((item) => item.sections)

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
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your grade level" />
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
                                    <SelectTrigger>
                                        <SelectValue placeholder="your section" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {filteredSections.map((section: string, index: number) => (
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