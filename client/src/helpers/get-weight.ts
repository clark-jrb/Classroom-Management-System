import { TaskTypes } from "@/types/types";

export function getWeightWithoutProject(type: TaskTypes) {
    const percentageMap: Record<TaskTypes, number> = {
        recitation: 6,
        activity: 9,
        quiz: 12,
        project: 0,
        summative: 25,
        exam: 50,
        '': 0
    };

    return percentageMap[type]
}

export function getWeightWithProject(type: TaskTypes) {
    const percentageMap: Record<TaskTypes, number> = {
        recitation: 3,
        activity: 5,
        quiz: 7,
        project: 10,
        summative: 25,
        exam: 50,
        '': 0
    };

    return percentageMap[type]
}