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
import { Input } from "@/components/ui/input"
import { useEffect } from "react"

interface IRegisterStudent {
    form: any
}

export const RegisterStudent = ({ form }: IRegisterStudent) => {
    const sectionsList = [
        { grade: 1, sections: ['Crabs', 'Corals'] },
        { grade: 2, sections: ['Pearls', 'Shrimps'] },
        { grade: 3, sections: ['Squids', 'Octopus'] },
        { grade: 4, sections: ['Lobsters', 'Eels'] },
        { grade: 5, sections: ['Turtles', 'Dolphins'] },
        { grade: 6, sections: ['Whales', 'Sharks'] }
    ];

    const grade_level = form.watch("gradeLevel") || 0

    const filteredSections = sectionsList.filter((item) => item.grade === grade_level).flatMap((item) => item.sections)

    useEffect(() => {
        form.resetField("section")
    }, [grade_level]);

    return (
        <>
        {/* Grade Level */}
        <FormField
            control={form.control}
            name="gradeLevel"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Grade Level:</FormLabel>
                    <FormControl>
                        <Input 
                            type="number" 
                            placeholder="your grade level" 
                            min={1}
                            max={6}
                            onChange={(e) => field.onChange(Number(e.target.value))} 
                            // disabled={registerUser.isPending}
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
        {/* Section */}
        {grade_level !== 0 && 
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