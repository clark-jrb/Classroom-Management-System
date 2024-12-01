import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { teacherInfo } from "@/hooks/useTeacherInfo"

export const Recitations = () => {
    const { teacher_role, grade_assigned, section_handled, subjects } = teacherInfo()

    return (
        <div>
            <Dialog>
                <div className="mb-3 text-xl">
                    Recitations
                </div>
                <DialogTrigger asChild>
                    <Button>
                        Create recitation record
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create Recitation</DialogTitle>
                            <DialogDescription>
                                Choose students
                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            <div>
                                Pick Subject:
                            </div>
                            {subjects?.map((data: string, index: number) => (
                                <Button key={index} variant={'outline'}>{data}</Button>
                            ))}
                        </div>
                        <DialogFooter>
                            <Button>
                                Create
                            </Button>
                        </DialogFooter>
                </DialogContent>

            </Dialog>
        </div>
    )
}
