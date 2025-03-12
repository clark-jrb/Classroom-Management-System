import { GradeLevels, QuarterTypes } from "@/types/global.types";

export function getQuarterName(quarter: QuarterTypes) {
    const select = {
        q1: 'Quarter 1',
        q2: 'Quarter 2',
        q3: 'Quarter 3',
        q4: 'Quarter 4'
    }

    return select[quarter as keyof typeof select]
}

export function getGradeName(grade: GradeLevels) {
    const select = {
        grade_1: 'Grade 1',
        grade_2: 'Grade 2',
        grade_3: 'Grade 3',
        grade_4: 'Grade 4',
        grade_5: 'Grade 5',
        grade_6: 'Grade 6'
    }

    return select[grade as keyof typeof select]
}