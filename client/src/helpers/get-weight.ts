import { TaskTypes } from "@/types/global.types";

export function getWeightWithoutProject(type: TaskTypes | "") {
    const select_percentage: Record<TaskTypes | "", number> = {
        recitation: 5,
        activity: 8,
        quiz: 12,
        project: 0,
        summative: 25,
        exam: 50,
        '': 0
    };

    return select_percentage[type]
}

export function getWeightWithProject(type: TaskTypes | "") {
    const select_percentage: Record<TaskTypes | "", number> = {
        recitation: 3,
        activity: 5,
        quiz: 7,
        project: 10,
        summative: 25,
        exam: 50,
        '': 0
    };

    return select_percentage[type]
}