import { studentPersonalSchema } from "@/schemas/studentSchemas";
import { studentScoreSchema } from "@/schemas/teacherSchemas";
import { z } from "zod";


export function getChangedFields(
    existingData: z.infer<typeof studentPersonalSchema>,
    newData: z.infer<typeof studentPersonalSchema>
) {
    const changes: Record<string, any> = {};

    Object.keys(existingData).forEach((key) => {
        const existValue = existingData[key as keyof typeof existingData];
        const newValue = newData[key as keyof typeof newData];

        // Compare values, handling date formatting if needed
        const existingValueCurrent = existValue instanceof Date ? existValue.getTime() : existValue;
        const newValueCurrent = newValue instanceof Date ? newValue.getTime() : newValue;

        if (existingValueCurrent !== newValueCurrent) {
            changes[key] = newValue;
        }

    });

    return changes;
}

type StudentScore = z.infer<typeof studentScoreSchema>["student_scores"]

export function getChangedScores(
    originalScores: StudentScore,
    newScores: StudentScore
) {
    if (!originalScores || originalScores.length !== newScores.length) {
        throw new Error("Both arrays must have the same length and be defined");
    }

    const changedScores = newScores.filter((newItem, index) => {
        const originalItem = originalScores[index];
        return newItem.score !== originalItem.score;
    });

    return changedScores.map(({ _id, sid, score }) => ({ _id, sid, score }));
}





