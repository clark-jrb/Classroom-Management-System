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

export const Recitations = () => {
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
                            content here
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
