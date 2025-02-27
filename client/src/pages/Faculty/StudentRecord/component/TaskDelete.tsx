import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { CircleX } from "lucide-react"

export const TaskDelete = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <CircleX size={'20px'}/>
                </DialogTrigger>

                <DialogContent className="w-fit">
                    <DialogHeader>
                        <DialogTitle>
                            Are you sure you want to delete this?
                        </DialogTitle>
                        <DialogDescription className="py-4">
                            This action is cannot be undone
                        </DialogDescription>
                        <div className="flex space-x-2 justify-end">
                            <Button>Yes</Button>
                            <DialogClose asChild>
                                <Button type="button" variant={'destructive'}>Cancel</Button>
                            </DialogClose>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
