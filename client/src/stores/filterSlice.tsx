import { create } from "zustand"
import { QuarterTypes } from "@/types/types"

type QuarterStore = {
    quarter: QuarterTypes
    setQuarter: (newQuarter: QuarterTypes) => void
}

export const useQuarterStore = create<QuarterStore>((set) => ({
    quarter: 'q1',
    setQuarter: (newQuarter) => set({ quarter: newQuarter })
}))