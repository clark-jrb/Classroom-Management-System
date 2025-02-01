import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { 
    Form,
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
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { useStudentQueries } from "@/hooks/useStudentQueries"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { getChangedFields } from "@/helpers/changed-fields"
import { useEffect } from "react"
import { studentPersonalSchema } from "@/schemas/studentSchemas"

export const ProfileForm = () => {
    const { studentData, updatePersonal } = useStudentQueries() // from custom hook
    const { personal } = studentData // destructure studentData but only get the personal data
    const convertedData = {...personal, birth_date: new Date(personal.birth_date)} // because the birth_date is string from the document

    // personal information form
    const personalForm = useForm<z.infer<typeof studentPersonalSchema>>({
        resolver: zodResolver(studentPersonalSchema)
    })

    function onSubmit(values: z.infer<typeof studentPersonalSchema>) {
        const getChanges = getChangedFields(convertedData, values)

        if (Object.keys(getChanges).length !== 0) {
            updatePersonal.mutate(getChanges)
            // console.log(values)
            console.log('updated successfully')
        } else {
            console.log('there is nothing to update')
        }
    }

    function onError(errors: any) { console.log("Form errors:", errors) }

    // fill the dialog form with data
    useEffect(() => {
        if (studentData) {
            personalForm.reset(convertedData)
        }
    }, [studentData, personalForm])

    return (
        <DialogContent className="sm:max-w-[625px]">
            <Form {...personalForm}>
                <form onSubmit={personalForm.handleSubmit(onSubmit, onError)} className="space-y-6">
                    {/* header  */}
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                        {/* body  */}
                        <div className="flex gap-4">
                            <div className="grid gap-4 py-4 w-1/2">
                                {/* First Name */}
                                <FormField
                                    control={personalForm.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name:</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your first name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Middle Name */}
                                <FormField
                                    control={personalForm.control}
                                    name="middlename"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Middle Name:</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your middle name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Last Name */}
                                <FormField
                                    control={personalForm.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name:</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your last name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-4 py-4 w-1/2">
                                {/* Contact */}
                                <FormField
                                    control={personalForm.control}
                                    name="contact"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact:</FormLabel>
                                            <FormControl>
                                                <Input placeholder="your contact number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Sex */}
                                <FormField
                                    control={personalForm.control}
                                    name="sex"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sex:</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="your sex" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="male">Male</SelectItem>
                                                        <SelectItem value="female">Female</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Birth Date */}
                                <FormField
                                    name="birth_date"
                                    control={personalForm.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Birth Date:</FormLabel>
                                            <FormControl>
                                                <DatePicker
                                                    startYear={1950}
                                                    endYear={2024}
                                                    value={field.value}
                                                    onChange={(date) => field.onChange(date)}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        {/* footer  */}
                    <DialogFooter>
                        <Button type="submit" disabled={updatePersonal.isPending}>
                            {updatePersonal.isPending ? "Loading..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    )
}
