import { Context } from "hono";
import { collection_question } from "../Config/DbConnection";
import { ObjectId } from "mongodb";

export const askQuestion = async (c: Context) => {
    const student = c.get("student");
    const { question } = await c.req.json();
    if (!question) return c.json({ message: "Question is required" }, 400);

    try {
        const id = student?._id;
        console.log(id);
        const newQuestion = {
            student: id,
            admin: null,
            question,
            answer: null,
            createdAt: new Date(),
        };
        await collection_question.insertOne(newQuestion);
        return c.json({ message: "Question asked successfully" }, 200);
    } catch (error) {
        return c.json({ message: (error as Error).message }, 500);
    }
}

export const QuestionReply = async (c: Context) => {
    let admin = c.get("admin");
    if (!admin) admin = c.get("staff");
    if (!admin) return c.json({ message: "Admin or Staff not found" }, 404);

    const { id, answer } = await c.req.json();
    if (!id || !answer) return c.json({ message: "Question ID and answer is required" }, 400);

    try {
        const question = await collection_question.findOne({ _id: new ObjectId(id) });
        if (!question) return c.json({ message: "Question not found" }, 404);

        await collection_question.updateOne({ _id: new ObjectId(id) }, { $set: { admin: admin?._id, answer } });
        return c.json({ message: "Question replied successfully" }, 200);
    } catch (error) {
        return c.json({ message: (error as Error).message }, 500);
    }
}

export const getAllQuestionByStudent = async (c: Context) => {
    const { id } = c.req.param();
    if (!id) return c.json({ message: "Student ID is required" }, 400);

    try {
        const questions = await collection_question.find({ student: new ObjectId(id) }).sort({ createdAt: -1 }).toArray();
        if (!questions) return c.json({ message: "No questions found" }, 404);
        return c.json(questions, 200);
    } catch (error) {
        return c.json({ message: (error as Error).message }, 500);
    }
}

export const deleteQuestion = async (c: Context) => {
    const { id } = c.req.param();
    if (!id) return c.json({ message: "Question ID is required" }, 400);

    try {
        await collection_question.deleteOne({ _id: new ObjectId(id) });
        return c.json({ message: "Question deleted successfully" }, 200);
    } catch (error) {
        return c.json({ message: (error as Error).message }, 500);
    }
}

export const getStudentList = async (c: Context) => {
    try {
        const students = await collection_question.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "student",
                    foreignField: "_id",
                    as: "studentDetails"
                }
            },
            { $unwind: "$studentDetails" },

            // group to remove duplicates
            {
                $group: {
                    _id: "$studentDetails._id",
                    student: { $first: "$studentDetails" },
                }
            },
        ]).toArray();

        if (!students) return c.json({ message: "No Question found " }, 200);
        return c.json({ students });
    } catch (error) {
        return c.json({ message: (error as Error).message }, 500);
    }
}