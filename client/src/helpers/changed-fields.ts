import { studentPersonalSchema } from "@/schemas/studentSchemas";
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





