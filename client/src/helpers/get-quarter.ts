import { QuarterTypes } from "@/types/global.types";

export function getQuarterName(quarter: QuarterTypes) {
    const select = {
        q1: 'Quarter 1',
        q2: 'Quarter 2',
        q3: 'Quarter 3',
        q4: 'Quarter 4'
    }

    return select[quarter as keyof typeof select]
}