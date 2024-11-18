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

interface IRegisterStudent {
    form: any
    watch_grade: number
}

export const RegisterStudent = ({ form, watch_grade }: IRegisterStudent) => {
    const sectionsList = [
        { grade: 1, sections: ['Crabs', 'Corals'] },
        { grade: 2, sections: ['Pearls', 'Shrimps'] },
        { grade: 3, sections: ['Squids', 'Octopus'] },
        { grade: 4, sections: ['Lobsters', 'Eels'] },
        { grade: 5, sections: ['Turtles', 'Dolphins'] },
        { grade: 6, sections: ['Whales', 'Sharks'] }
    ];
    const filteredSections = sectionsList.filter((item) => item.grade === watch_grade).flatMap((item) => item.sections)

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
        {watch_grade !== 0 && 
            <FormField
                key={watch_grade}
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