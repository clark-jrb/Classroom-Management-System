import { create } from "zustand"

type DialogStore = {
    open: boolean,
    openDialog: (newRole: boolean) => void
}

export const useTaskDialogStore = create<DialogStore>((set) => ({
    open: false,
    openDialog: (setOpen) => set({ open: setOpen })
}))