import { Context, MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from 'hono/jwt'

export const verifyMiddleware: MiddlewareHandler = async (c, next) => {
    try {
        const token = getCookie(c, "token");
        if (!token) return c.json({ message: "Unauthorized" }, 401);

        const docode = await verify(token, process.env.JWT_SECRET || "");
        if (!docode) return c.json({ message: "Invalid token" }, 401);

        console .log("Decoded Token:", docode);
        c.set("user", docode);

        return next();
    } catch (error: any) {
        return c.json({ message: error.message }, 401);
    }
}