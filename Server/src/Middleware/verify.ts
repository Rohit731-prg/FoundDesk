import { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from 'hono/jwt'
import { collection_user } from "../Config/DbConnection";
import { ObjectId } from "mongodb";

export const verifyMiddleware: MiddlewareHandler = async (c, next) => {
    try {
        const token = getCookie(c, "token");
        if (!token) return c.json({ message: "Unauthorized" }, 401);

        const docode = await verify(token, process.env.JWT_SECRET || "");
        if (!docode) return c.json({ message: "Invalid token" }, 401);

        c.set("user", docode);
        if (docode.role === "student") {
            const student = await collection_user.findOne({ _id: new ObjectId(docode.id as string) });
            if (!student) return c.json({ message: "Student not found" }, 401);
            if (!student.auth) return c.json({ message: "Student is not authenticated" }, 401);
        }

        return next();
    } catch (error: any) {
        return c.json({ message: error.message }, 401);
    }
}