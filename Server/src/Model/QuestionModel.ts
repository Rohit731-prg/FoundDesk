import { ObjectId } from "mongodb";
import { z } from "zod";

export const QuestionSchema = z.object({
    student: ObjectId,
    admin: ObjectId || null,
    question: z.string(),
    answer: z.string() || null,
    createdAt: z.date().default(new Date()),
});