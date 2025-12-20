import { ObjectId } from "mongodb";
import { z } from "zod";

export const QuestionSchema = z.object({
    student: z.string(),
    admin: z.string().nullable(),
    question: z.string(),
    answer: z.string().nullable(),
    createdAt: z.date().default(new Date()),
});