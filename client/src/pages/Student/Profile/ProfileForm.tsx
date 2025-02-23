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
import { useProfileMutation, useStudentData } from "@/hooks/useStudentQueries"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { getChangedFields } from "@/helpers/changed-fields"
import { useEffect } from "react"
import { studentProfileSchema } from "@/schemas/studentSchemas"
import { useToastStore } from "@/stores/toastStore"
import { toast } from "sonner"

export const ProfileForm = () => {
    const { data: student_data } = useStudentData()
    const { updateProfile } = useProfileMutation() // from custom hook
    const { profile } = student_data // destructure student_data but only get the profile data
    const convertedData = {...profile, birth_date: new Date(profile.birth_date)} // because the birth_date is string from the document
    const { message, type, clearToast } = useToastStore()
    
    // profile information form
    const profile_form = useForm<z.infer<typeof studentProfileSchema>>({
        resolver: zodResolver(studentProfileSchema)
    })

    function onSubmit(values: z.infer<typeof studentProfileSchema>) {
        const getChanges = getChangedFields(convertedData, values)

        if (Object.keys(getChanges).length !== 0) {
            updateProfile.mutateAsync(getChanges)
        } else {
            toast.warning('There is nothing to update')
        }
    }

    function onError(errors: any) { console.log("Form errors:", errors) }

    // fill the dialog form with data
    useEffect(() => {
        if (student_data) {
            profile_form.reset(convertedData)
        }
    }, [student_data, profile_form])

    
    useEffect(() => {
        if (message) {
            toast[type || 'info'](message)
            clearToast()
        }
    }, [message, type, clearToast])

    return (
        <DialogContent className="sm:max-w-[625px]">
            <Form {...profile_form}>
                <form onSubmit={profile_form.handleSubmit(onSubmit, onError)} className="space-y-6">
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
                                    control={profile_form.control}
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
                                    control={profile_form.control}
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
                                    control={profile_form.control}
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
                                    control={profile_form.control}
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
                                    control={profile_form.control}
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
                                    control={profile_form.control}
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
                        <Button type="submit" disabled={updateProfile.isPending}>
                            {updateProfile.isPending ? "Loading..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    )
}
