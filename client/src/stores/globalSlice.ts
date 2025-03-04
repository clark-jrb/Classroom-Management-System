import { QuarterTypes } from "@/types/global.types"
import { create } from "zustand"


type CurrentQuarterStore = {
    current_quarter: QuarterTypes | ""
    setCurrentQuarter: (value: QuarterTypes | "") => void
}

export const useCurrentQuarterStore = create<CurrentQuarterStore>((set) => ({
    current_quarter: "",
    setCurrentQuarter: (value) => set({
        current_quarter: value
    }),
}))