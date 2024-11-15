import { StudentContainer } from "@/components/student-container"
import { StudentLayout } from "./StudentLayout"
import { studentInfo } from "@/hooks/useStudentInfo"
import { Badge } from "@/components/ui/badge"
import { ReactComponent as PenEdit } from '@/assets/icons/pen-edit.svg'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
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
// import { Label } from "@radix-ui/react-label"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { studentInfoSchema } from "@/schemas/studentSchemas"
import { studentFunctions } from "@/hooks/useStudentInfo"
import { z } from "zod"

export const Profile = () => {
    const { fullName, grade, studentData, studentInfoLoading, studentInfoError, studentForm } = studentInfo()  // this should be complete or else it won't load the loading UI
    const { updateInfo, openDialog, setOpenDialog } = studentFunctions()

    function onSubmit(values: z.infer<typeof studentInfoSchema>) {
        updateInfo.mutate(values)
    }

    function onError (errors: any) { console.log("Form errors:", errors) }

    return (
        <StudentLayout>
            <StudentContainer>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    {/* PROFILE CONTENT  */}
                    <div className="h-full">
                        {studentInfoError && <div>Error</div>}
                        {studentInfoLoading ? 
                            <div>Loading...</div> 
                            : 
                            <div className="info-cont">
                                {/* HEADER */}
                                <div className="info-cont-head h-auto w-full">
                                    <div className="w-96">
                                        <div className="student-name mb-2">
                                            <p>
                                                {fullName}
                                            </p>
                                        </div>
                                        <div className="flex mb-4">
                                            <Badge variant="outline">Grade&nbsp;{grade}</Badge>
                                            <DialogTrigger asChild>
                                                <span className="edit-profi-btn flex ms-auto text-sm">
                                                    Edit&nbsp;<PenEdit className="h-5"/>
                                                </span>
                                            </DialogTrigger>
                                            
                                        </div>
                                    </div>
                                </div>
                                {/* BODY */}
                                <div className="info-cont-body pt-8 h-full w-full">
                                    <div className="w-96 flex flex-col gap-5">
                                        {studentData.map(({ label, value }, index: number) => (
                                            <div key={index} className="info-data-cont" id={label}>
                                                <label htmlFor={label}>{label}:</label>
                                                <span className="text-lg">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>



                    {/* DIALOG CONTENT  */}
                    <DialogContent className="sm:max-w-[625px]">
                        <Form {...studentForm}>
                            <form onSubmit={studentForm.handleSubmit(onSubmit, onError)} className="space-y-6">
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
                                                control={studentForm.control}
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
                                                control={studentForm.control}
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
                                                control={studentForm.control}
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
                                            {/* Sex */}
                                            <FormField
                                                control={studentForm.control}
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
                                            
                                        </div>
                                        <div className="grid gap-4 py-4 w-1/2">
                                            {/* Birth Date */}
                                            <FormField
                                                name="birth_date"
                                                control={studentForm.control}
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
                                            {/* Email */}
                                            <FormField
                                                control={studentForm.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email:</FormLabel>
                                                        <FormControl>
                                                            <Input type="email" placeholder="Your email" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            {/* Contact */}
                                            <FormField
                                                control={studentForm.control}
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
                                        </div>
                                    </div>
                                    {/* footer  */}
                                <DialogFooter>
                                    <Button type="submit" disabled={updateInfo.isPending}>
                                        {updateInfo.isPending ? "Loading..." : "Save changes"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </StudentContainer>
        </StudentLayout>
    )
}
