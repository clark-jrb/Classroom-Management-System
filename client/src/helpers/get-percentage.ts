import { TaskTypes } from "@/types/types";

export function getPercentage(type: TaskTypes) {
    const percentageMap: Record<TaskTypes, number> = {
        recitation: 6,
        activity: 9,
        quiz: 12,
        project: 10,
        summative: 25,
        exam: 50,
        '': 0
    };

    return percentageMap[type]
}